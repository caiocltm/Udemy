const express = require('express');

const router = express.Router();

// MongoDB Models
const Post = require('../models/posts.model');

router.post('', async (req, res, next) => {
    try {
        const post = new Post({
            title: req.body.title,
            content: req.body.content
        });
        const postSaved = await post.save();
        res.status(201).json({
            message: 'Post added succesfully!',
            post: postSaved
        });
    } catch(error) {
        console.log(error);
    }
});

router.get('', async (req, res, next) => {
    try {
        const posts = await Post.find();
        res.status(200).json({
            message: 'Posts fetched successfully!',
            posts
        });
    } catch(error) {
        console.log(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if(post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({
                message: 'Post not found!'
            })
        }
    } catch(error) {
        console.log(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await Post.deleteOne({ _id: req.params.id });
        res.status(200).json({
            message: 'Post deleted successfully!'
        });
    } catch(error) {
        console.log(error);
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        const post = new Post({
            _id: req.body.id,
            title: req.body.title,
            content: req.body.content
        });
        const updateResult = await Post.updateOne({ _id: req.params.id }, post);
        if (updateResult.nModified === 1) {
            res.status(200).json({
                message: 'Post updated successfully!'
            });
        } else {
            res.status(200).json({
                message: 'No post were updated!'
            });
        }
    } catch(error) {
        console.log(error);
    }
});

module.exports = router;