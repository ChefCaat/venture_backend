var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("I am working. Please do not disturb.")
});

module.exports = router;
