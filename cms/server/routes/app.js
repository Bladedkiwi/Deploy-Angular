const path = require('path');

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../../dist/Contacts/assets'));
});

module.exports = router;
