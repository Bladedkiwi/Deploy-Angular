const express = require('express');
const router = express.Router();
const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contact');


// Get/Read contact
router.get('/', function (req,res) {
  // Retrieve all contacts from the database using the contact model
  Contact.find()
    .populate('group')
    // Success
    .then(contactList => {
      res.status(200).json(contactList);
      // Fail
    }).catch(error =>{
    res.status(500).json({
      message: "contact retrieval failed",
      error: error
    })
  });
});

// Post/Create contact

router.post('/', (req, res, next) => {
  // Calls the sequencer to generate the new Id for the contact
  const maxContactId = sequenceGenerator.nextId("contacts");

  // request.body is the object's content
  // request.body is the object's content
  const contact = new Contact({
    id: maxContactId,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    imageUrl: req.body.imageUrl,
    group: req.body.group,
  });

  // Saves the contact to the database
  contact.save()

    // Success
    .then(createdContact => {
      res.status(201).json(createdContact);
    })
    // Fail
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

// // Put/Update contact
// Path now includes the :id like the routing done in the app's component routing module - also the contact.id
router.put('/:id', (req, res, next) => {

  // Find the desired contact by id
  Contact.findOne({ id: req.params.id })
    // Success
    .then(contact => {
      contact.id = req.body.id;
      contact.name= req.body.name;
        contact.email= req.body.email;
        contact.phone= req.body.phone;
        contact.imageUrl= req.body.imageUrl;
        contact.group= req.body.group;
      //
      contact.updateOne({ id: req.params.id }, contact)
        .then(result => {
          res.status(204).json({
            message: 'Contact updated successfully'
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
        message: 'contact not found.',
        error: { contact: 'contact not found'}
      });
    });
});

// // Delete contact
router.delete('/:id', (req,res) => {
  Contact.findOne({id: req.params.id })
    .then(contact => {
      contact.deleteOne({id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "contact deleted successfully"
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
        message: 'contact not found.',
        error: {contact: 'contact not found'}
      });
    });
});

module.exports = router;
