var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function (req, res, next) {
  console.log('i am in the users');
  res.send('respond with a resource');
});

module.exports = router;
