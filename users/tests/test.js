//var server = require("../main");
var server = "http://localhost:5001";
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
    
    it('should successfully insert users into database', async function(){

        for(var i = 0; i < users.length; i++) {
            const res = await chai.request(server)
                .post('/users/sign-up')
                .send(users[i])

            expect(res.status).to.equal(200);
        }
    });
    
    
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
    
  });


describe('Login and Logout', function() {

    var accessTokens = [];
    var refreshTokens = [];

    it('should successfully retrieve user data and tokens', async function() {
        for(var i = 0; i < users.length; i++) {
            const res = await chai.request(server)
                .post('/users/login')
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

    // it('should log these users out', async function() {
    //     for(var i = 0; i < users.length; i++) {
    //         const res = await chai.request(server)
    //             .post('/users/logout')
    //             .set('authorization', 'Bearer ' + accessTokens[i])
    //             .send(users[i]);

    //         expect(res.status).to.equal(200);
    //         expect(res.body.data).to.equal("success")
    //     }
    // });

    // it('should verify that the tokens are invalid', async function() {
    //     var numKeys = accessTokens.length;
    //     for(var index = 0; index < numKeys; index++) {

    //         const res = await chai.request(server)
    //             .post('/tokens/verify')
    //             .set('authorization', 'Bearer ' + accessTokens[index])
    //             .send({"refreshToken": refreshTokens[index]})

    //         expect(res.status).to.equal(403);
    //         expect(res.body.headerResult.error).to.equal("Token is invalidated or Inactive")
            
    //     }
    // });

    accessTokens = [];
    refreshTokens = [];

    it('should successfully relog the user back in', async function() {
        for(var i = 0; i < users.length; i++) {
            const res = await chai.request(server)
                .post('/users/login')
                .send(users[i]);

            expect(res.status).to.equal(200);
            accessTokens.push(res.body.data.accessKey);
            refreshTokens.push(res.body.data.refreshKey);

        }
    });

    it('should successfully delete user accounts', async function() {
        for(var i = 0; i < users.length; i++) {
            console.log(server + `/users/delete-account/${users[i].email}`)
            const res = await chai.request(server)
                .delete(`/users/delete-account/${users[i].email}`)
                .set('authorization', 'Bearer ' + accessTokens[i])

            expect(res.status).to.equal(200);
        }
    });

    it('should verify that the tokens are invalid', async function() {
        var numKeys = accessTokens.length;
        for(var index = 0; index < numKeys; index++) {

            const res = await chai.request(server)
                .post('/tokens/verify')
                .set('authorization', 'Bearer ' + accessTokens[index])
                .send({"refreshToken": refreshTokens[index]})

            expect(res.status).to.equal(403);
            expect(res.body.headerResult.error).to.equal("Token is invalidated or Inactive")
            
        }
    });

});

describe('Invalid field Logins', function() {

    var badUser = {
        firstName: "JustTest",
        lastName: "FooBar",
        username: "Mr.Tester",
        email: "MrTester@yahoo.com",
        password: "mypass123",
        local: true
    }

    it('should fail for invalid emails', async function() {
        delete badUser.email;
        var res = await chai.request(server)
            .post('/users/sign-up')
            .send(badUser);

        expect(res.status).to.equal(401);
        expect(res.body.error).to.equal("Missing field component(s) or Incorrect fields");
    });
});

describe("Delete Created Accounts", async function () {

    it('should successfully insert users into database', async function(){

        for(var i = 0; i < fakeUsers.length; i++) {
            const res = await chai.request(server)
                .post('/users/sign-up')
                .send(fakeUsers[i])

            expect(res.status).to.equal(200);
        }
    });

    var accessToken = [];
    var refreshToken = [];

    it('should successfully retrieve user data and tokens', async function() {
        for(var i = 0; i < fakeUsers.length; i++) {
            const res = await chai.request(server)
                .post('/users/login')
                .send(fakeUsers[i]);

            expect(res.status).to.equal(200);
            expect(res.body.data).to.have.property('accessKey');
            expect(res.body.data).to.have.property('refreshKey');
            accessToken.push(res.body.data.accessKey);
            refreshToken.push(res.body.data.refreshKey);
        }
    });

    it('should successfully delete user accounts', async function() {
        for(var i = 0; i < fakeUsers.length; i++) {
            console.log(server + `/users/delete-account/${fakeUsers[i].email}`)
            const res = await chai.request(server)
                .delete(`/users/delete-account/${fakeUsers[i].email}`)
                .set('authorization', 'Bearer ' + accessToken[i])

            expect(res.status).to.equal(200);
        }
    });

    it('should fail when deleted users try to login in again', async function() {
        for(var i = 0; i < fakeUsers.length; i++) {
            const res = await chai.request(server)
                .post('/users/login')
                .send(fakeUsers[i]);

            expect(res.status).to.equal(401);
            expect(res.body.error).to.equal("Invalid credentials");
        }
    });

    it('tokens should be invalid when deleting an account', async function() {
        var numKeys = accessToken.length;
        for(var index = 0; index < numKeys; index++) {

            const res = await chai.request(server)
                .post('/tokens/verify')
                .set('authorization', 'Bearer ' + accessToken[index])
                .send({"refreshToken": refreshToken[index]})

            expect(res.status).to.equal(403);
            expect(res.body.headerResult.error).to.equal("Token is invalidated or Inactive")
            
        }
    });

});


