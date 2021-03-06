var express = require('express');
var router = express.Router();

const axios = require('axios');
const { getIDFromURL } = require('../utils/index');

router.get('/', function (req, res, next) {
  res.redirect('/item/1');
});

router.get('/:id', async function (req, res, next) {
  try {
    const id = req.params.id;

    const url = 'https://pokeapi.co/api/v2/item/' + id;
    const response = await axios.get(url);
    const itemListUrl = 'https://pokeapi.co/api/v2/item/?limit=999';
    const allItemResponse = await axios.get(itemListUrl);

    const allItemNames = allItemResponse.data.results;
    for (var i = 0; i < allItemNames.length; i++) {
      const spriteName = allItemNames[i].name;
      const spriteImg = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${spriteName}.png`;
      allItemNames[i].image = spriteImg;
    }

    const itemObject = {
      id: response.data.id,
      name: response.data.name,
      sprite: response.data.sprites.default,
      korName: response.data.names[1].name,
      effect: response.data.effect_entries[0].effect,
      korEffect: response.data.flavor_text_entries[10].text,
      itemList: JSON.stringify(allItemNames),
    };
    //make a for loop in flavour text to look make sure the korean one exists
    res.render('item', itemObject);
  } catch (error) {
    const message =
      error.response && error.response.status === 404
        ? 'Item not found'
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
