// Dependencies
const mongoose = require('mongoose');

const contact = new mongoose.Schema({
  id: {type: String},
  name: {type: String},
  email: {type: String},
  phone: {type: String},
  imageUrl: {type: String},
  group: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contact'}]
});


// Define contact model
module.exports = mongoose.model('Contact', contact);

