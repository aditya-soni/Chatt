const express = require('express');
const mongoose = require('mongoose');
var router = express.Router();

var {Message} = require('../models/message');

router.get('/',(req,res)=>{
    res.send('APi')
});

// create message
router.post('/message',(req,res)=>{
    var content  = req.body.content;
    var newMsg = new Message({content})
    newMsg.save().then(
        (message)=>{
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
});

// get messages
router.get('/message',(req,res)=>{
    Message.find().then(
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

// update message
router.patch('/message/:id',(req,res)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({
            message : 'Please enter a valid Id'
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
});

// delete message
router.delete('/message/:id',(req,res)=>{
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(400).json({
            message : 'Please enter a valid Id'
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
            })
        },
        (err)=>{
            res.status(400).json({
                message: 'Something went wrong',
                error : err
            })
        }
    )
})

module.exports = router;