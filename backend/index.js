const express = require('express');
const AddToCart = require('./addToCart');
const SearchKeyword = require('./searchKeyword');
const Handler = require('./handler');
const bodyParser = require('body-parser');

const app = express();
const port = 8000;
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/addToCart', (req, res) => {
  const cart = JSON.parse(req.body.cart)
  console.log(cart)
  cart.map(obj => {return parseObject(obj)}).forEach(async (obj) => await Handler.handle(obj.ingredientName, obj.quantity))

  res.status(200).send({message: "SUCCESS"})
  //res.send(SearchKeyword.searchKeyword("maple+syrup"));

  //res.send(AddToCart.addToCart("B01LYWQUSG",
  //    "LjtcaqKTEiJFpwMnGDwSxsbfx6QaPmvSG6ZY%2BoY9dOUUfF3heRZf3yQVREPIXiextiP51j3%2BCxK01f8o5QUeHSomcQ8lzme7Gj0I4xVbc89h5auGM7PgV2AeRIVrlfhxXsmP%2B%2B0KyhpuT%2BzoHyw2EUrakHbamNLHk5u7oAm4Wbk%3D",
  //    1));

});

function parseObject(cart){
  return {ingredientName: cart.ingredient, quantity: cart.quantity}
}



app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});