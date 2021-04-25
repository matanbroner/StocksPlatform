var assert = require("assert");
var server=require("../main");

var chai = require("chai");
var chaiHttp = require("chai-http");
var should = chai.should();

chai.use(chaiHttp);

var units = ["a", "b", "c", "d"]

var users = []

units.forEach((unit) => {
    users.push({
        firstName: unit,
        lastName: unit,
        username: unit,
        email: unit.concat("@yahoo.com"),
        password: unit
    })
});

describe('Signup', function() {
    it('should successfully insert users into database', function(){

        for(var i = 0; i < users.length; i++) {
            chai.request(server)
            .post('/users/sign-up')
            .send(users[i])
            .end((error, res) => {
                res.should.have.status(200);
            });
        }
    });
  });
