const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader) {
        const error = new Error('Not authenticated!');
        error.statusCode = 401;
        throw error;
    }
    const token = req.get('Authorization').split(' ')[1];
    let decodedToken;

    try {
        decodedToken = jwt.verify(token, '23454DF65S1DF#$@#$@sdFDG45FGH4F@#!$@#SDF5C1DS5F7Q9W116Z6s5');
    } catch(error) {
        error.statusCode = 500;
        throw error;
    }

    if(!decodedToken) {
        const error = new Error('Not authenticated!');
        error.statusCode = 401;
        throw error;
    }

    req.userId = decodedToken.userId;
    next();
};