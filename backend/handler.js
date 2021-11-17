const AddToCart = require('./addToCart');
const SearchKeyword = require('./searchKeyword');

const handle = async function(keywordList) {

    for (let index = 0; index < keywordList.length; index++) {
        const searchResult = await SearchKeyword.searchKeyword(keywordList[index]);
        console.log("SEARCH result: " + JSON.stringify(searchResult));
        AddToCart.addToCart(searchResult["asin"], searchResult["offerListingID"], 1);
    }
};

const searchAndAddToCart = async function(keyword) {

};

exports.handle = handle;