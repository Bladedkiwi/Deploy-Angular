const express = require('express');
const router = express.Router();
const sequenceGenerator  = require('./sequenceGenerator');
const Message = require('../models/message');


// Get/Read Message
router.get('/', function (req,res) {
  // Retrieve all messages from the database using the message model
  Message.find()
    // Success
    .then(messageList => {
      res.status(200).json(messageList);
      // Fail
    }).catch(error =>{
    res.status(500).json({
      message: "Message retrieval failed",
      error: error
    })
  });
});

// Post/Create Message

router.post('/', (req, res, next) => {
  // Calls the sequencer to generate the new Id for the message
  const maxMessageId = sequenceGenerator.nextId("messages");

  // request.body is the object's content
  // request.body is the object's content
  const message = new Message({
    id: maxMessageId,
    subject: req.body.subject,
    msgText: req.body.msgText,
    sender: req.body.sender
  });

  // Saves the message to the database
  message.save()

    // Success
    .then(createdMessage => {
      res.status(201).json(createdMessage);
    })
    // Fail
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

// // Put/Update Message
// Path now includes the :id like the routing done in the app's component routing module - also the message.id
router.put('/:id', (req, res, next) => {

  // Find the desired message by id
  Message.findOne({ id: req.params.id })
    // Success
    .then(message => {
      message.id = req.body.id;
      message.subject = req.body.subject;
      message.msgText = req.body.msgText;
      message.sender = req.body.sender;
      //
      Message.updateOne({ id: req.params.id }, message)
        .then(result => {
          res.status(204).json({
            message: 'Message updated successfully'
          })
        })
        .catch(error => {
          res.status(500).json({
            message: 'An error occurred',
            error: error
          });
        });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Message not found.',
        error: { message: 'Message not found'}
      });
    });
});

// // Delete Message
router.delete('/:id', (req,res) => {
  Message.findOne({id: req.params.id })
    .then(message => {
      Message.deleteOne({id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Message deleted successfully"
          });
        })
        .catch(error => {
          res.status(500).json({
            message: 'An error occurred',
            error: error
          });
        })
    })
    .catch(error => {
      res.status(500).json({
        message: 'Message not found.',
        error: {message: 'Message not found'}
      });
    });
})

module.exports = router;
