const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var router = express.Router();

var {Message} = require('../models/message');
var {User} = require('../models/user');


router.get('/',(req,res)=>{
    res.send('APi')
});
// app.use('/message',authenticate);

var authenticate = (req,res,next)=>{
    jwt.verify(req.query.token,'aditya',(err,decoded)=>{
        if(err){
            return res.status(401).json({
                message : 'Authentication failure',
                error : err
            })
        }
        next()
    })
}

// get messages
router.get('/message',(req,res)=>{
    Message.find().populate('user','firstName') .then(
        (messages)=>{
            res.status(200).json({
                message : 'Success!',
                obj : messages
            })
        },
        (err)=>{
            res.send(400).json({
                message : 'Something went wrong',
                obj :err
            })
        }
    );
});

// create message
router.post('/message',authenticate,(req,res)=>{
    var decoded = jwt.decode(req.query.token);
    User.findById(decoded.user._id,(err,user)=>{
        if(err){
            res.status(400).json({
                message : 'Something went wrong',
                error : err
            });
        }
        var content  = req.body.content;
        var newMsg = new Message({content,user})
        newMsg.save().then(
            (message)=>{
                user.messages.push(message);
                user.save();
                res.status(200).json({
                    message : 'Saved Succesfully',
                    obj : message
                })
            }
        ),
        err =>{
            res.status(400).json({
                message : 'Something went wrong',
                error : err
            })
        }
    } )


});


// update message
router.patch('/message/:id',authenticate,(req,res)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({
            message : 'Please enter a valid Id'
        })
    }
    var decoded = jwt.decode(req.query.token);
    Message.findById(req.params.id).then(
        (message)=>{
            if(message.user != decoded.user._id){
                return res.json({
                    message : 'user dont match'
                })
            }
            Message.findByIdAndUpdate(req.params.id,{$set : { content : req.body.content } }, {new : true},(err,result)=>{
                if(err){
                    return res.status(404).json({
                        message : 'Some error has occured',
                        error : err
                    })
                }
                if(!result){
                    return res.status(404).json({message: 'No message found'});
                }
                res.status(200).json({
                    message : 'Updated Succesfully',
                    obj : result
                })
            });
        }
    )
    // Message.findByIdAndUpdate(req.params.id,{$set : { content : req.body.content } }, {new : true},(err,result)=>{
    //     if(err){
    //         return res.status(404).json({
    //             message : 'Some error has occured',
    //             error : err
    //         })
    //     }
    //     if(!result){
    //         return res.status(404).json({message: 'No message found'});
    //     }
    //     res.status(200).json({
    //         message : 'Updated Succesfully',
    //         obj : result
    //     })
    // });
});

// delete message
router.delete('/message/:id',authenticate,(req,res)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({
            message : 'Please enter a valid Id'
        })
    }
    var decoded = jwt.decode(req.query.token);
    Message.findById(req.params.id).then(
        (message)=>{
            if(message.user != decoded.user._id ){
                return res.json({
                    message : 'user dont match'
                })
            }
            Message.findByIdAndRemove(req.params.id).then(
                (deletedMessage)=>{
                    if(!deletedMessage){
                        return res.status(404).json({
                            message : 'Could not found a message to delete'
                        });
                    }
                    res.status(200).json({
                        message : 'Deleted Succesfully'
                    });
                    deletedMessage.remove();
                },
                (err)=>{
                    res.status(400).json({
                        message: 'Something went wrong',
                        error : err
                    })
                }
            )
        }
    )
    // Message.findByIdAndRemove(req.params.id).then(
    //     (deletedMessage)=>{
    //         if(!deletedMessage){
    //             return res.status(404).json({
    //                 message : 'Could not found a message to delete'
    //             });
    //         }
    //         res.status(200).json({
    //             message : 'Deleted Succesfully'
    //         });
    //         deletedMessage.remove();
    //     },
    //     (err)=>{
    //         res.status(400).json({
    //             message: 'Something went wrong',
    //             error : err
    //         })
    //     }
    // )
});

// Auth routes
// create user

router.post('/user',(req,res)=>{
    var user = new User({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.password,10)
    });
    user.save().then(
        (savedUser)=>{
            res.status(201).json({
                message: 'Saved Succesfully',
                obj : savedUser
            })
        },
        (err)=>{
            res.status(400).json({
                message : 'An error has occured',
                error : err
            })
        }
    )
});

// sign in user and generate token
router.post('/user/login',(req,res)=>{
    User.findOne({email:req.body.email}).then(
        (user)=>{
            // invalid user email
            if(!user){
                return res.status(404).json({
                    message : 'No user found'
                })
            }
            // checking password with hashed one and sending response
            bcrypt.compare(req.body.password,user.password,(err,result)=>{
                if(err){return res.status(400).json({error : err}) }
                if(result){
                    var token = jwt.sign({user:user},'aditya',{expiresIn:"2h"});
                    res.status(200).json({
                    message : 'Success',
                    token : token,
                    userId : user._id,
                    auth :result
                })}
                else{
                    res.status(400).json({message:'enter valid details',auth : result})
                }
            })

        },
        (err)=>{
            res.status(400).json({
                message : ' An error occured',
                error : err
            })
        }
    )
});

module.exports = router;