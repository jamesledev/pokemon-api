var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  const object = {
    title: 'Express',
    name: 'James',
  };
  res.render('index', object);
});

router.get('/james', function (req, res, next) {
  const object = {
    title: 'Express',
    name: 'Le',
  };
  res.render('james', object);
});

router.post('/', function (req, res, next) {
  res.redirect(`/pokemon/1`);
});

module.exports = router;
