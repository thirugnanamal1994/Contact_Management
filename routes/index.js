//include functionalities of express.ks
var express = require('express');
var router = express.Router();

//assign starting page
router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
