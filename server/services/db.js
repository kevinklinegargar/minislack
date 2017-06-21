var mongoose = require('mongoose');
var config = require('./../config/config');
var uri = config.mongodb.host+":"+config.mongodb.port+"/"+config.mongodb.dbname;
mongoose.connect(uri);
// CONNECTION EVENTS
// When successfully connected
var db = mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + uri);
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 
require('./../models/User');
module.exports = db;
