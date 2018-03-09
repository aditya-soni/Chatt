const {mongoose} = require('../db/mongoose');
var Schema = mongoose.Schema;

var messageSchema = new Schema({
    content : {
        type :String,
        required :true,
        trim : true,
        minlength : 1
    },
    user : {
        type : Schema.Types.ObjectId, ref : 'User'
    }
});

var Message = mongoose.model('Message',messageSchema);

module.exports = {Message};