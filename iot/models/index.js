var mongoose = require('mongoose');
    mongoose.connect("mongodb://localhost/intro_to_iot_dev");
    
mongoose.set('debug', true);
mongoose.promise = Promise;


module.exports.Settings = require('./settings');
module.exports.Stats = require('./statistics');
module.exports.Data = require('./data');