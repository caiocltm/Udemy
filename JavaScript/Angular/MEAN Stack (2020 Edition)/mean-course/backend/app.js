const nodeServer = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Posts Routes
const PostRoutes = require('./routes/posts');

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
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    if (req.method === 'OPTIONS') {
        res.header({
            'Access-Contol-Allow-Methods': 'POST, PATCH, DELETE, GET, PUT'
        });
        return res.status(200).json({});
    }
    next();
});

// Posts routes middleware
nodeServer.use('/api/posts', PostRoutes);

mongoose.connect(
    'mongodb://127.0.0.1:27017/node-angular', //Host
    { // Options
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    (err) => err && (console.log('MongoDB Server error: ', err)) // Callback error.
)
.then(_ => console.log('MongoDB Server is running!'))
.catch(error => console.log('MongoDB Server connection error: ', error));

module.exports = nodeServer;