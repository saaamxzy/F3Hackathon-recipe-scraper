const AddToCart = require('./addToCart');
const SearchKeyword = require('./searchKeyword');

const handle = async function(keyword, quantity) {

    const searchResult = await SearchKeyword.searchKeyword(keyword);
    AddToCart.addToCart(searchResult["asin"], searchResult["offerListingID"], quantity);
};

const searchAndAddToCart = async function(keyword) {

};

exports.handle = handle;