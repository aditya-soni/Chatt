const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
var url = process.env.MONGODB_URI || 'mongodb://localhost:27017/test-chat';
// var url = 'mongodb://admin:admin@ds263138.mlab.com:63138/chatt'
mongoose.connect(url);

module.exports = {mongoose};