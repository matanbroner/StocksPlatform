var server = require("../main");

var chai = require("chai");
var chaiHttp = require("chai-http");
var expect = chai.expect;

chai.use(chaiHttp);

const jwt = require("jsonwebtoken");
const HelperModule = require("../utils/helper");

var units = ["aaaaa", "bbbbb", "ccccc", "ddddd"]
var users = []
units.forEach((unit) => {
    users.push({
        firstName: unit,
        lastName: unit,
        username: unit,
        email: unit.concat("@yahoo.com"),
        password: unit,
        local: true
    })
});

var fakeUnits = ["zzzzz", "yyyyy", "xxxxx", "wwwww"]
var fakeUsers = []
fakeUnits.forEach((unit) => {
    fakeUsers.push({
        firstName: unit,
        lastName: unit,
        username: unit,
        email: unit.concat("@yahoo.com"),
        password: unit,
        local: true
    })
});

// Note: Don't use end() in a chai request. It does not work well with asynchronous tests

describe('Signup', function() {
    
    it('should successfully insert users into database', function(done){

        for(var i = 0; i < users.length; i++) {
            chai.request(server)
            .post('/users/sign-up')
            .send(users[i])
            .end((error, res) => {
                expect(res.status).to.equal(200);
                if(i == 4) {
                    done();
                }
            });
        }
    });
    
    /*
    it('should fail, same users are already in database', function(){

        for(var i = 0; i < users.length; i++) {
            chai.request(server)
            .post('/users/sign-up')
            .send(users[i])
            .end((error, res) => {
                expect(res.body).to.have.property('error');
                expect(res.status).to.equal(401);
            });
        }
    });
    */
  });


describe('Login', function() {
    var accessTokens = [];
    var refreshTokens = [];
    it('should successfully retrieve user data and tokens', async function() {
        for(var i = 0; i < users.length; i++) {
            const res = await chai.request(server)
                .post('/users/logout')
                .send(users[i]);

            expect(res.status).to.equal(200);
            expect(res.body.data).to.have.property('accessKey');
            expect(res.body.data).to.have.property('refreshKey');
            accessTokens.push(res.body.data.accessKey);
            refreshTokens.push(res.body.data.refreshKey);
        }
    });

    it('should fail. These users have no signed up', async function() {
        for(var i = 0; i < fakeUsers.length; i++) {
            const res = await chai.request(server)
                .post('/users/login')
                .send(fakeUsers[i]);

            expect(res.status).to.equal(401);
            expect(res.body).to.have.property('error');
        }
    })

    it('should verify that the tokens are valid and strings', async function() {
        var numKeys = accessTokens.length;
        for(var index = 0; index < numKeys; index++) {
            jwt.verify(accessTokens[index], process.env.JWT_KEY, async (error, decodedToken) => {
                expect(error).to.be.null;
            });
            jwt.verify(refreshTokens[index], process.env.REFRESH_SECRET, async (error, decodedToken) => {
                expect(error).to.be.null;
            });

            const res = await chai.request(server)
                .post('/tokens/verify')
                .set('authorization', 'Bearer ' + accessTokens[index])
                .send({"refreshToken": refreshTokens[index]})

            expect(res.status).to.equal(200);
            
        }
    });

    it('should log these users out', async function() {
        for(var i = 0; i < users.length; i++) {
            const res = await chai.request(server)
                .post('/users/logout')
                .set('authorization', 'Bearer ' + accessTokens[i])
                .send(users[i]);

            expect(res.status).to.equal(200);
            expect(res.body.data).to.equal("success")
        }
    });
});
