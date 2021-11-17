const AddToCart = require('./addToCart');
const SearchKeyword = require('./searchKeyword');

const handle = async function(keywordList) {

    const searchResult = await SearchKeyword.searchKeyword(keywordList[1]);
    AddToCart.addToCart(searchResult["asin", searchResult[offerListingID]], 1);
};

const searchAndAddToCart = async function(keyword) {

};

exports.handle = handle;