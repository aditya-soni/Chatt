const {mongoose} = require('../db/mongoose');
const {User}= require('./user');
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


messageSchema.post('remove',(message)=>{
    User.findById(message.user).then(
        (user)=>{
            // console.log(message)
            user.messages.pull(message);
            user.save()
        },
        (err)=>{
            console.err(err);
        }
    )
})

var Message = mongoose.model('Message',messageSchema);

module.exports = {Message};