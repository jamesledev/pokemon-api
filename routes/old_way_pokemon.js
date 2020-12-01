var express = require('express');
var router = express.Router();

const axios = require('axios');
/* GET home page. */

function getIDFromURL(url) {
  url = url.split('/');
  let id = url[url.length - 2];
  return id;
}

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
      const evolutionChain = response.data.chain;
      pokemonObject.evolutions = {
        firstEvo: [],
        secondEvo: [],
        thirdEvo: [],
      };
      let firstEvoId = getIDFromURL(evolutionChain.species.url);
      pokemonObject.evolutions.firstEvo.push({
        name: evolutionChain.species.name,
        level: '',
        id: firstEvoId,
      });
      if (evolutionChain.evolves_to[0]) {
        for (var i = 0; i < evolutionChain.evolves_to.length; i++) {
          const evolutionTo = evolutionChain.evolves_to[i];
          const evoTwo = evolutionTo.species.name;
          const level = evolutionTo.evolution_details[0].min_level;
          const id = getIDFromURL(evolutionTo.species.url);
          const evolutionDetails = evolutionTo.evolution_details[0];
          let {
            gender,
            held_item,
            item,
            known_move,
            known_move_type,
            location,
            min_affection,
            min_beauty,
            min_happiness,
            min_level,
            needs_overworld_rain,
            party_species,
            party_type,
            relative_physical_stats,
            time_of_day,
            trade_species,
            trigger,
            turn_upside_down,
          } = evolutionDetails;

          item = item ? item.name : item;
          const evolutionTree = {
            name: evoTwo,
            level,
            id,
            item,
            min_happiness,
            time_of_day,
          };
          pokemonObject.evolutions.secondEvo.push(evolutionTree);
        }
      }
      if (evolutionChain.evolves_to[0].evolves_to[0]) {
        for (var i = 0; i < evolutionChain.evolves_to.length; i++) {
          const evolutionTo = evolutionChain.evolves_to[0].evolves_to[i];
          const evoThree = evolutionTo.species.name;
          const level = evolutionTo.evolution_details[0].min_level;
          const id = getIDFromURL(evolutionTo.species.url);

          const evolutionDetails = evolutionTo.evolution_details[0];
          let {
            gender,
            held_item,
            item,
            known_move,
            known_move_type,
            location,
            min_affection,
            min_beauty,
            min_happiness,
            min_level,
            needs_overworld_rain,
            party_species,
            party_type,
            relative_physical_stats,
            time_of_day,
            trade_species,
            trigger,
            turn_upside_down,
          } = evolutionDetails;

          item = item ? item.name : item;

          const evolutionTree = {
            name: evoThree,
            level,
            id,
            item,
            min_happiness,
            time_of_day,
          };
          pokemonObject.evolutions.thirdEvo.push(evolutionTree);
        }
      }

      // //level
      // //item
      // //condition

      return pokemonObject;
    })
    .catch(function (error) {
      console.log('look here james here is the error', error);
    })
    .then(function (data) {
      console.log(pokemonObject);
      console.log(pokemonObject.evolutions.secondEvo);
      res.render('pokemon', pokemonObject);
    });
});

module.exports = router;
