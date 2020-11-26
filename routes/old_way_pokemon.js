var express = require('express');
var router = express.Router();

const axios = require('axios');
/* GET home page. */
router.get('/:id', function (req, res, next) {
  const id = req.params.id;
  console.log(id);
  const url = 'https://pokeapi.co/api/v2/pokemon/' + id;
  let pokemonObject = {};
  axios
    .get(url)
    .then(function (response) {
      let type2 = '';
      if (response.data.types[1]) {
        type2 = response.data.types[1].type.name;
      }
      pokemonObject = {
        id: response.data.id,
        name: response.data.name,
        weight: response.data.weight / 10,
        height: response.data.height / 10,
        img: response.data.sprites.other['official-artwork'].front_default,
        type1: response.data.types[0].type.name.toLowerCase(),
        type2: type2.toLowerCase(),
      };
      // console.log(speciesUrl);
      return axios.get('https://pokeapi.co/api/v2/pokemon-species/' + id);
    })
    .then(function (response) {
      let evoUrl = response.data.evolution_chain.url;
      return axios.get(evoUrl);
    })
    .then(function (response) {
      pokemonObject.evolutions = [];
      pokemonObject.evolutions.push({
        name: response.data.chain.species.name,
        level: '',
      });
      if (response.data.chain.evolves_to[0]) {
        for (var i = 0; i < response.data.chain.evolves_to.length; i++) {
          let evoTwo = response.data.chain.evolves_to[i].species.name;
          let level =
            response.data.chain.evolves_to[i].evolution_details[0].min_level;
          const evolutionTree = {
            name: evoTwo,
            level: level,
          };
          pokemonObject.evolutions.push(evolutionTree);
          console.log(level);
        }
      }
      if (response.data.chain.evolves_to[0].evolves_to[0]) {
        for (var i = 0; i < response.data.chain.evolves_to.length; i++) {
          let evoThree =
            response.data.chain.evolves_to[0].evolves_to[i].species.name;
          let level =
            response.data.chain.evolves_to[0].evolves_to[i].evolution_details[0]
              .min_level;
          const evolutionTree = {
            name: evoThree,
            level: level,
          };
          pokemonObject.evolutions.push(evolutionTree);
        }
      }

      //level
      //item
      //condition

      return pokemonObject;
    })
    .catch(function (error) {
      console.log('look here james here is the error', error);
    })
    .then(function (data) {
      console.log(pokemonObject);
      res.render('pokemon', pokemonObject);
    });
});

module.exports = router;
