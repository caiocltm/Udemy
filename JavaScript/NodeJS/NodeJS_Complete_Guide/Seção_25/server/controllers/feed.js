const fs = require('fs');
const path = require('path');

const { validationResult } = require("express-validator");
const Post = require("../models/post");
const User = require('../models/user');

exports.getPosts = (req, res, next) => {
	const currentPage = req.query.page || 1;
	const perPage = 2;
	let totalItems;

	Post.find()
		.countDocuments()
		.then(count => {
			totalItems = count;
			return Post.find().skip((currentPage - 1) * perPage).limit(perPage);
		})
		.then(posts => {
			if (!posts) {
				const error = new Error("Could not find any posts.");
				error.statusCode = 422;
				throw error;
			}
			res.status(200).json({ posts, totalItems });
		})
		.catch(error => {
			!error.statusCode && (error.statusCode = 500);
			next(error);
		});

};

exports.createPost = (req, res, next) => {
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
	let creator;
	const post = new Post({
		title: title,
		content: content,
		imageUrl: imageUrl,
		creator: req.userId
	});
	post.save()
		.then(_ => {
			return User.findById(req.userId);
		})
		.then(user => {
			creator = user;
			user.posts.push(post);
			return user.save();
		})
		.then(_ => {
			res.status(201).json({
				message: "Post created successfully!",
				post: post,
				creator: {
					_id: creator._id,
					name: creator.name
				}
			});
		})
		.catch(error => {
			!error.statusCode && (error.statusCode = 500);
			next(error);
		});
};

exports.getPost = (req, res, next) => {
	const postId = req.params.postId;
	Post.findById(postId)
		.then(post => {
			if (!post) {
				const error = new Error("Could not find post.");
				error.statusCode = 404;
				throw error;
			}
			res.status(200).json({ post });
		})
		.catch(error => {
			!error.statusCode && (error.statusCode = 500);
			next(error);
		});
};

exports.updatePost = (req, res, next) => {
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

	Post.findById(postId)
	.then(post => {
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
		imageUrl !== post.imageUrl && (clearImage(post.imageUrl));

		post.title = title;
		post.imageUrl = imageUrl;
		post.content = content;
		return post.save();
	})
	.then(result => res.status(200).json({ post: result }))
	.catch(error => {
		!error.statusCode && (error.statusCode = 500);
		next(error);
	})
};

exports.deletePost = (req, res, next) => {
	const postId = req.params.postId;
	Post.findById(postId)
	.then(post => {
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
		return Post.deleteOne({ _id: postId });
	})
	.then(_ => {
		return User.find(req.userId);
	})
	.then(user => {
		user.posts.pull(postId);
		user.save();
	})
	.then(_ => res.status(200).json({ message: `Post ${postId} was deleted successfully!` }))
	.catch(error => {
		!error.statusCode && (error.statusCode = 500);
		next(error);
	});
};

const clearImage = filePath => {
	filePath = path.join(__dirname, '..', filePath);
	fs.unlink(filePath, error => console.log(error));
};