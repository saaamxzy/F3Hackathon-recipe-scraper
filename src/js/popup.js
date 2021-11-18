import "../css/popup.css";
import "../../backend/handler";
import { handle } from "../../backend/handler";

chrome.runtime.onMessage.addListener(function(request, sender) {
  
    if (request.action == "getSource") {
      message.innerText = request.source;
    }
  });

document.addEventListener('DOMContentLoaded', (event) => {
  // console.log('DOM fully loaded and parsed');
    var link = document.getElementById("testId");
    link.addEventListener('click', async (input) => {
      
      console.log(message.innerText);
      var dataStr = message.innerText;
      // var data = {"cart": [{"ingredient":"butter", "name":"stick butter", "quantity": 8, "quantityUnit":"tablespoons" 
      //   }, {"ingredient":"onion", "name":"stick butter", "quantity": 10, "quantityUnit":"tablespoons"}]};
      // var dataStr = JSON.stringify(data);
      const url = "http://127.0.0.1:8000/addToCart";

      const response = await fetch(url, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
        },
        body: dataStr
      });
      return response;

    });
});


  
function onWindowLoad() {
  console.log('please');
  var message = document.querySelector('#message');

  chrome.tabs.executeScript(null, {
    file: "getPagesSource.bundle.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

}

window.onload = onWindowLoad;
