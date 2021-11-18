import "../css/popup.css";
import "../../backend/handler";

chrome.runtime.onMessage.addListener(function(request, sender) {
  
    if (request.action == "getSource") {
      message.innerText = request.source;
      console.log("asdsadasdas");
    }
  });

document.addEventListener('DOMContentLoaded', (event) => {
  // console.log('DOM fully loaded and parsed');
    var link = document.getElementById("testId");
    link.addEventListener('click', () => {
      handle();
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
