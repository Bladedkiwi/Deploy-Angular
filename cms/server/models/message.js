// Dependencies
const mongoose = require('mongoose');

const message = new mongoose.Schema({
  id: {type: String},
  subject: {type: String},
  msgText: {type: String},
  sender: { type: mongoose.Schema.Types.String, ref: 'Contact'}
});


// Define document model
module.exports = mongoose.model('Message', message);

