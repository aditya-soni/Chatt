const {mongoose} = require('../db/mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    firstName :{ 
        type : String,
        required : true
    },
    lastName : { 
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password: {
        type :String,
        required : true
    },
    messages : [{
        type : Schema.Types.ObjectId, ref : 'Message'
    }]
});

var User = mongoose.model('User',userSchema);

module.exports = {User};