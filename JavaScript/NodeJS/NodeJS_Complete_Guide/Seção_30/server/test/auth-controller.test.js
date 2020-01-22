const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');

const User = require('../models/user');
const AuthController = require('../controllers/auth');

describe('Auth Controller', () => {

    before(done => {
        mongoose.connect('mongodb://127.0.0.1:27017/messages', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        .then(_ => {
            const user = new User({
                email: "teste@caio.com.br",
                password: "123456",
                name: "Test",
                posts: [],
                _id: "5c0f66b979af55031b34728a"
            });
            return user.save();
        })
        .then(_ => done())
        .catch(error => console.log('Test: MongoDB Error: ', error));
    });

    // beforeEach(_ => {});

    // afterEach(_ => {});

    it('Should throw an error with code 500, if accessing the database fails.', (done) => {
        sinon.stub(User, 'findOne');
        User.findOne.throws();
        const req = {
            body: {
                email: "caio.menezes@yboh.com.br",
                password: "1233456"
            }
        };
        AuthController.login(req, {}, () => {})
        .then(result => {
            expect(result).to.be.an('error');
            expect(result).to.have.property('statusCode', 500);
            done();
        });

        User.findOne.restore();
    });

    it('Should send a response with a valid user status for an existing user.', (done) => {
        const req = { userId: "5c0f66b979af55031b34728a" };
        const res = {
            statusCode: 500,
            userStatus: null,
            status: function(code) {
                this.statusCode = code;
                return this;
            },
            json: function(data) {
                this.userStatus = data.status;
            }
        };
        AuthController.getUserStatus(req, res, () => {})
        .then(_ => {
            expect(res.statusCode).to.be.equal(200);
            expect(res.userStatus).to.be.equal('I am new');
            done();
        })
        .catch(error => console.log(error));
    });

    after(done => {
        User.deleteOne({ email: "teste@caio.com.br"})
        .then(_ => mongoose.disconnect())
        .then(_ => done());
    });
});
