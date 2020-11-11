var express = require('express');
var router = express.Router();

const axios = require('axios');
/* GET home page. */
router.get('/:id', function(req, res, next) {
    var id = req.params.id;
    console.log(id);
    var url ='https://pokeapi.co/api/v2/pokemon/'+ id;


  

axios.get(url)
  .then(function (response) {
 
    var pokemonObject = {
        name: response.data.name,
        weight: response.data.weight / 10,
        height: response.data.height / 10,
        img: response.data.sprites.front_default
    }
    return pokemonObject
  })
  .catch(function (error) {
    
    console.log('look here james here is the error', error);
  })
  .then(function (pokemonObject) {
      console.log(pokemonObject)


    res.render('pokemon', pokemonObject);
  });
  
 
});



module.exports = router;
