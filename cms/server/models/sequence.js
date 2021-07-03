// Dependencies
const mongoose = require('mongoose');

const sequence = new mongoose.Schema({
  maxDocumentId: {type: Number},
  maxMessageId: {type: Number},
  maxContactId: {type: Number}
});

// Define sequence model
// Module.Exports exports the module as the name implies, but it allows for other files to recognize the Schema as an actual Schema.
// Without the module.exports, it would only be pulling the file, and not the data inside because nothing is seen as being exported
module.exports = mongoose.model('Sequence', sequence);
