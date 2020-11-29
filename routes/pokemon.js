var express = require('express');
var router = express.Router();

const axios = require('axios');
/* GET home page. */
router.get('/:id', async function (req, res, next) {
  var id = req.params.id;
  console.log(id);
  var url = 'https://pokeapi.co/api/v2/pokemon/' + id;


  const response = await axios.get(url);
  
  // const evolution = await axios.get(asdasdasdasdasdasd)

  var type2 = null
  if(response.data.types[1]){
    type2 = response.data.types[1].type.name;
  }  else var type2 = "";

  var pokemonObject = {
    id: response.data.id,
    name: response.data.name,
    weight: response.data.weight / 10,
    height: response.data.height / 10,
    img: response.data.sprites.front_default,
    type1: response.data.types[0].type.name,
    type2: type2 

  }



  res.render('pokemon', pokemonObject);



});



module.exports = router;

