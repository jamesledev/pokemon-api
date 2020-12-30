var express = require('express');
var router = express.Router();

router.post('/', function (req, res, next) {
  const item = req.body.item;
  const itemUrl = item.replace(' ', '-');
  const itemName = itemUrl.toLowerCase();
  res.redirect(`/item/${itemName}`);
});

module.exports = router;
