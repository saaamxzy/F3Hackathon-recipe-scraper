import JSSoup from 'jssoup'; 

// document.addEventListener('DOMContentLoaded', function() {
//     var link = document.getElementById('testId');
//     console.log('linking');
//     // onClick's logic below:
//     link.addEventListener('click', function() {
//         console.log("abc");
//     });
// });

function ingredientObjToStr(ingredientObj) {
    return "name: " + ingredientObj.name
     + ", ingredient: " + ingredientObj.ingredient
     + ", quantity: " 
     + ingredientObj.quantity 
     + ", unit: " 
     + ingredientObj.quantityUnit;
}

function DOMtoString(document_root) {
    var html = '',
        node = document_root.firstChild;
    while (node) {
        switch (node.nodeType) {
        case Node.ELEMENT_NODE:
            html += node.outerHTML;
            break;
        case Node.TEXT_NODE:
            html += node.nodeValue;
            break;
        case Node.CDATA_SECTION_NODE:
            html += '<![CDATA[' + node.nodeValue + ']]>';
            break;
        case Node.COMMENT_NODE:
            html += '<!--' + node.nodeValue + '-->';
            break;
        case Node.DOCUMENT_TYPE_NODE:
            // (X)HTML documents are identified by public identifiers
            html += "<!DOCTYPE " + node.name + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '') + (!node.publicId && node.systemId ? ' SYSTEM' : '') + (node.systemId ? ' "' + node.systemId + '"' : '') + '>\n';
            break;
        }
        node = node.nextSibling;
    }

    
    var soup = new JSSoup(html);
    var allUls = soup.findAll("ul");
    var ingredientsRawArray;
    for (let i = 0; i < allUls.length; i++) {
        if (allUls[i].attrs.class == "ingredients-section") {
            ingredientsRawArray = allUls[i].contents;
            break;
        }
    }

    var ingredientsObjArray = [];
    var resultStr = "";
    for (let i = 0; i < ingredientsRawArray.length; i++) {
        var soupTag = ingredientsRawArray[i];
        var ingredientAttrs = soupTag.contents[0].contents[0].attrs;
        var ingredientObj = {
            name: ingredientAttrs.value,
            ingredient: ingredientAttrs["data-ingredient"],
            quantity: ingredientAttrs["data-quantity"],
            quantityUnit: ingredientAttrs['data-unit']
        }
        resultStr += ingredientObjToStr(ingredientObj) + "\n";
        ingredientsObjArray.push(ingredientObj);
    }

    console.log(ingredientsObjArray);

    var cartObj = {
        cart: ingredientsObjArray
    }

    return JSON.stringify(cartObj);
}

chrome.runtime.sendMessage({
    action: "getSource",
    source: DOMtoString(document)
});
