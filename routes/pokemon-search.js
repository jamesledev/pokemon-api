var express = require('express');
var router = express.Router();
router.post('/', function (req, res, next) {
  const item = req.body.item;
  res.redirect(`/item/${item}`);
});
router.post('/', function (req, res, next) {
  const pokemon = req.body.pokemon;
  res.redirect(`/pokemon/${pokemon}`);
});

module.exports = router;
