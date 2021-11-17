const express = require('express');
const AddToCart = require('./addToCart');
const SearchKeyword = require('./searchKeyword');
const Handler = require('./handler');

const app = express();
const port = 8000;

app.get('/', (req, res) => {

  Handler.handle(["maple+syrup", "ketchup"]);
  //res.send(SearchKeyword.searchKeyword("maple+syrup"));

  //res.send(AddToCart.addToCart("B01LYWQUSG",
  //    "LjtcaqKTEiJFpwMnGDwSxsbfx6QaPmvSG6ZY%2BoY9dOUUfF3heRZf3yQVREPIXiextiP51j3%2BCxK01f8o5QUeHSomcQ8lzme7Gj0I4xVbc89h5auGM7PgV2AeRIVrlfhxXsmP%2B%2B0KyhpuT%2BzoHyw2EUrakHbamNLHk5u7oAm4Wbk%3D",
  //    1));

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});