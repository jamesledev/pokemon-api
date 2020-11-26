var express = require('express');
var router = express.Router();

const axios = require('axios');
/* GET home page. */
router.get('/:id', function (req, res, next) {
  const id = req.params.id;
  console.log(id);
  const url = 'https://pokeapi.co/api/v2/pokemon/' + id;

  axios
    .get(url)

    .then(function (response) {
      let type2 = '';
      if (response.data.types[1]) {
        type2 = response.data.types[1].type.name;
      }
      const pokemonObject = {
        id: response.data.id,
        name: response.data.name,
        weight: response.data.weight / 10,
        height: response.data.height / 10,
        img: response.data.sprites.front_default,
        type1: response.data.types[0].type.name,
        type2: type2,
      };
      return pokemonObject;
    })
    // .then to get the url

    //chaining api requests

    .catch(function (error) {
      console.log('look here james here is the error', error);
    })
    .then(function (pokemonObject) {
      console.log(pokemonObject);
      res.render('pokemon', pokemonObject);
    });
});

module.exports = router;
