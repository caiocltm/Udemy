const expect = require('chai').expect;
const sinon = require('sinon');
const mongoose = require('mongoose');

const User = require('../models/user');
const Post = require('../models/post');
const FeedController = require('../controllers/feed');

describe('Feed Controller', () => {

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

    it('Should add a created post to the posts of the creator.', (done) => {
        const req = {
            body: {
                title: "Test Post!",
                content: "A new test post created!"
            },
            file: {
                path: '/img.jpg'
            },
            userId: '5c0f66b979af55031b34728a'
        };
        const res = {
            status: function() {
                return this;
            },
            json: function() {}
        };
        FeedController.createPost(req, res, () => {})
        .then(savedUser => {
            expect(savedUser).to.have.property('posts');
            expect(savedUser.posts).to.have.length(1);
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
