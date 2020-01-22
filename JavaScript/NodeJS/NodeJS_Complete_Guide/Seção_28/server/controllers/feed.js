const fs = require('fs');
const path = require('path');

const { validationResult } = require("express-validator");
const io = require('../socket');
const Post = require("../models/post");
const User = require('../models/user');

exports.getPosts = async (req, res, next) => {
	const currentPage = req.query.page || 1;
	const perPage = 2;
	try {
		const totalItems = await Post.find().countDocuments();
		const posts = await	Post.find()
								.populate('creator')
								.sort({createdAt: -1})
								.skip((currentPage - 1) * perPage)
								.limit(perPage);
		if (!posts) {
			const error = new Error("Could not find any posts.");
			error.statusCode = 422;
			throw error;
		}
		res.status(200).json({ posts, totalItems });
	} catch(error) {
		!error.statusCode && (error.statusCode = 500);
		next(error);
	}
};

exports.createPost = async (req, res, next) => {
	const errors = validationResult(req);
	if(!errors.isEmpty()) {
		const error = new Error("Validation failed, entered data is incorrect.");
		error.statusCode = 422;
		throw error;
	}
	if(!req.file) {
		const error = new Error("Validation failed, file is empty!");
		error.statusCode = 422;
		throw error;
	}
	const title = req.body.title;
	const imageUrl = req.file.path.replace("\\" ,"/");
	const content = req.body.content;
	const post = new Post({
		title: title,
		content: content,
		imageUrl: imageUrl,
		creator: req.userId
	});

	try {
		if(await post.save()) {
			const creator = await User.findById(req.userId);
			creator.posts.push(post);
			if(await creator.save()) {
				// io.getIO().emit('posts', { 
				// 	action: 'create', 
				// 	post: { 
				// 		...post._doc, 
				// 		creator: { 
				// 			_id: req.userId, 
				// 			name: creator.name
				// 		}
				// 	}
				// });
				res.status(201).json({
					message: "Post created successfully!",
					post: post,
					creator: {
						_id: creator._id,
						name: creator.name
					}
				});
			}
		}
	} catch(error) {
		!error.statusCode && (error.statusCode = 500);
		next(error);
	}
};

exports.getPost = async (req, res, next) => {
	const postId = req.params.postId;
	try {
		const post = await Post.findById(postId);
		if (!post) {
			const error = new Error("Could not find post.");
			error.statusCode = 404;
			throw error;
		}
		res.status(200).json({ post });
	} catch(error) {
		!error.statusCode && (error.statusCode = 500);
		next(error);
	}
};

exports.updatePost = async (req, res, next) => {
	const postId = req.params.postId;
	const errors = validationResult(req);
	if(!errors.isEmpty()) {
		const error = new Error("Validation failed, entered data is incorrect.");
		error.statusCode = 422;
		throw error;
	}
	const title = req.body.title;
	const content = req.body.content;
	let imageUrl = req.body.image;
	req.file && (imageUrl = req.file.path.replace("\\","/"));
	if(!imageUrl) {
		const error = new Error("No file picked!");
		error.statusCode = 422;
		throw error;
	}

	try {
		const post = await Post.findById(postId).populate('creator');
		if (!post) {
			const error = new Error("Could not find any post.");
			error.statusCode = 404;
			throw error;
		}
		if(post.creator._id.toString() !== req.userId) {
			const error = new Error("Not Authorized!");
			error.statusCode = 403;
			throw error;
		}
		imageUrl !== post.imageUrl && (clearImage(post.imageUrl));
		post.title = title;
		post.imageUrl = imageUrl;
		post.content = content;
		const result = await post.save();
		// io.getIO().emit('posts', { action: 'update', post: result });
		result && (res.status(200).json({ post: result }));
	} catch(error) {
		!error.statusCode && (error.statusCode = 500);
		next(error);
	}
};

exports.deletePost = async (req, res, next) => {
	const postId = req.params.postId;
	try {
		const post = await Post.findById(postId);
		if (!post) {
			const error = new Error("Could not find any post.");
			error.statusCode = 404;
			throw error;
		}
		if(post.creator.toString() !== req.userId) {
			const error = new Error("Not Authorized!");
			error.statusCode = 403;
			throw error;
		}
		clearImage(post.imageUrl);
		
		if(await Post.deleteOne({ _id: postId })) {
			const user = await User.findById(req.userId);
			user && (
				user.posts.pull(postId),
				await user.save() && (
					// io.getIO().emit('posts', { action: 'delete', post: postId }),
					res.status(200).json({ message: `Post ${postId} was deleted successfully!` })
				)
			)
		}
	} catch(error) {
		!error.statusCode && (error.statusCode = 500);
		next(error);
	}
};

const clearImage = filePath => {
	filePath = path.join(__dirname, '..', filePath);
	fs.unlink(filePath, error => console.log(error));
};