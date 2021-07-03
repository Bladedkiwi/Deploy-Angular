const express = require('express');
const router = express.Router();
const sequenceGenerator  = require('./sequenceGenerator');
const Document = require('../models/document');


// CRUD - Create Read Update Delete

// Get/Read Document
router.get('/', function (req,res) {
  // Retrieve all documents from the database using the document model
    Document.find()
      // Success
      .then(documentList => {
        res.status(200).json(documentList);
      // Fail
      }).catch(error =>{
        res.status(500).json({
          message: "Document retrieval failed",
          error: error
        })
      });
  });

// Post/Create Document

router.post('/', (req, res, next) => {
  // Calls the sequencer to generate the new Id for the document
  const maxDocumentId = sequenceGenerator.nextId("documents");

  // request.body is the object's content
  // request.body is the object's content
  const document = new Document({
    id: req.body.id,
    name: req.body.name,
    description: req.body.description,
    url: req.body.url
  });

  // Saves the document to the database
  document.save()

    // Success
    .then(createdDocument => {
      res.status(201).json(createdDocument);
    })
    // Fail
    .catch(error => {
      res.status(500).json({
        message: 'An error occurred',
        error: error
      });
    });
});

// // Put/Update Document
// Path now includes the :id like the routing done in the app's component routing module - also the document.id
router.put('/:id', (req, res, next) => {

  // Find the desired document by id
  Document.findOne({ id: req.params.id })
    // Success
    .then(document => {
      document.id = req.body.id;
      document.name = req.body.name;
      document.description = req.body.description;
      document.url = req.body.url;
      //
      Document.updateOne({ id: req.params.id }, document)
        .then(result => {
          res.status(204).json({
            message: 'Document updated successfully'
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
        message: 'Document not found.',
        error: { document: 'Document not found'}
      });
    });
});

// // Delete Document
router.delete('/:id', (req,res) => {
  Document.findOne({id: req.params.id })
    .then(document => {
      Document.deleteOne({id: req.params.id })
        .then(result => {
          res.status(204).json({
            message: "Document deleted successfully"
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
        message: 'Document not found.',
        error: {document: 'Document not found'}
      });
    });
});



module.exports = router;


