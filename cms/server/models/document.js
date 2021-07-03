// Dependencies
const mongoose = require('mongoose');

const document = new mongoose.Schema({
  id: {type: String},
  name: {type: String},
  description: {type: String},
  url: {type: String},
  children: [{
    id: {type: String},
    name: {type: String},
    description: {type: String},
    url: {type: String}
  }]
});

// Define document model
module.exports = mongoose.model('Document', document);

