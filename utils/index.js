/**
 * Grabs last number from URL as the pokemon ID
 * @param {string} url http://pokeapi.com/1
 */
function getIDFromURL(url) {
  url = url.split('/');
  let id = url[url.length - 2];
  return id;
}

module.exports = {
  getIDFromURL,
};
