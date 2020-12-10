var express = require('express');
var router = express.Router();

const axios = require('axios');
const { getIDFromURL } = require('../utils/index');

function getEvolutionInformation(evolutionChain) {
  const evolutionArray = [];
  for (var i = 0; i < evolutionChain.length; i++) {
    const evolutionTo = evolutionChain[i];
    const evoTwo = evolutionTo.species.name;
    const level = evolutionTo.evolution_details[0].min_level;
    const id = getIDFromURL(evolutionTo.species.url);
    const evolutionDetails = evolutionTo.evolution_details[0];
    const trigger =
      evolutionTo.evolution_details[0].trigger.name != 'trade'
        ? null
        : evolutionTo.evolution_details[0].trigger.name;
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
      needs_overworld_rain,
      party_species,
      party_type,
      relative_physical_stats,
      time_of_day,
      turn_upside_down,
    } = evolutionDetails;
    item = item ? item.name : item;
    location = location ? location.name : location;
    known_move_type = known_move_type ? known_move_type.name : known_move_type;
    known_move = known_move ? known_move.name : known_move;
    held_item = held_item ? held_item.name : held_item;
    if (relative_physical_stats === 0) {
      relative_physical_stats = 'equal';
    }
    const evolutionTree = {
      name: evoTwo,
      level,
      id,
      gender,
      held_item,
      item,
      known_move,
      known_move_type,
      location,
      min_affection,
      min_beauty,
      min_happiness,
      needs_overworld_rain,
      party_species,
      party_type,
      relative_physical_stats,
      time_of_day,
      turn_upside_down,
      trigger,
    };
    evolutionArray.push(evolutionTree);
  }
  return evolutionArray;
}

router.get('/', function (req, res, next) {
  res.redirect('/pokemon/1');
});

router.get('/:id', async function (req, res, next) {
  try {
    // console.log(req);
    const id = req.params.id;

    console.log(id);
    const url = 'https://pokeapi.co/api/v2/pokemon/' + id;

    const response = await axios.get(url);
    const evolution = await axios.get(
      'https://pokeapi.co/api/v2/pokemon-species/' + id
    );
    const evoUrl = evolution.data.evolution_chain.url;
    const evoInfo = await axios.get(evoUrl);
    const evolutionChain = evoInfo.data.chain;
    const pokemonNames = await axios.get(
      'https://pokeapi.co/api/v2/pokemon/?limit=2000'
    );

    // let type2 = null;
    // if (response.data.types[1]) {
    //   type2 = response.data.types[1].type.name;
    // } for reference of this below if statement
    const type2 = response.data.types[1]
      ? response.data.types[1].type.name
      : null;

    const firstEvo = [];
    firstEvo.push({
      name: evolutionChain.species.name,
      level: '',
      id: getIDFromURL(evolutionChain.species.url),
    });

    const secondEvolutionChain = evolutionChain.evolves_to.length
      ? evolutionChain.evolves_to
      : null;
    const secondEvo = secondEvolutionChain
      ? getEvolutionInformation(secondEvolutionChain)
      : [];

    const thirdEvolutionChain =
      secondEvolutionChain && secondEvolutionChain[0].evolves_to.length
        ? evolutionChain.evolves_to[0].evolves_to
        : null;
    const thirdEvo = thirdEvolutionChain
      ? getEvolutionInformation(thirdEvolutionChain)
      : [];

    const pokemonObject = {
      id: response.data.id,
      name: response.data.name,
      weight: response.data.weight / 10,
      height: response.data.height / 10,
      img: response.data.sprites.other['official-artwork'].front_default,
      type1: response.data.types[0].type.name,
      type2: type2,
      evolutions: {
        firstEvo,
        secondEvo,
        thirdEvo,
      },
      nameList: JSON.stringify(pokemonNames.data.results),
    };

    res.render('pokemon', pokemonObject);
  } catch (error) {
    const message =
      error.response && error.response.status === 404
        ? 'Pokemon not found'
        : 'Generic Error';
    res.render('error', {
      message,
      error: {
        stack: error.stack,
        status:
          error.response && error.response.status ? error.response.status : '',
      },
    });
    // console.log('look here james here is the error', error);
  }
});

module.exports = router;
