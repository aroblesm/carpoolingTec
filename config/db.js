const mongoose = require('mongoose'),
    dbURI =  'mongodb://localhost:27017/myapp';

// Create the database connection
mongoose.connect(dbURI);


// CONNECTION EVENTS

// When successfully connected
mongoose.connection.on('connected', function () {
    // console.log('Connection open to ' + dbURI);
});

// If the connection throws an error
mongoose.connection.on('error', function (err) {
    console.log('Connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
    console.log('Connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        //console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});