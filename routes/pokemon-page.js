var express = require('express');
var router = express.Router();
router.post('/', function (req, res, next) {
  res.redirect(`/pokemon/1`);
});
module.exports = router;
