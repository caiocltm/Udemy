const nodeServer = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// MongoDB Models
const Post = require('./models/posts.model');

nodeServer.use(bodyParser.json());
nodeServer.use(bodyParser.urlencoded({ extended: false }));

nodeServer.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods", 
        "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
});

nodeServer.post('/api/posts', async (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    });
    await post.save();
    res.status(201).json({
        message: 'Post added succesfully!'
    });
});

nodeServer.get('/api/posts', async (req, res, next) => {
    const posts = await Post.find();
    res.status(200).json({
        message: 'Posts fetched successfully!',
        posts
    });
});

mongoose.connect('mongodb://127.0.0.1:27017/node-angular', 
(err) => err && (console.log('MongoDB Server error: ', err)))
.then(_ => console.log('MongoDB Server is running!'))
.catch(error => console.log('MongoDB Server connection error: ', error));

module.exports = nodeServer;