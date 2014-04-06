// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
	
// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
	// No tabs or host permissions needed!
	console.log('Executing on ' + tab.url);
	chrome.tabs.executeScript({file: "content_script.js"});
});

//code: 'document.body.style.backgroundColor="red"'
//file: "content_script.js"

<<<<<<< HEAD
//append it to the DOM
$("body").append($element);

$(document).ready(function(){
  $("#text").click(function(){
    document.getElementById("text").innerHTML += "That tickles!";
  });
});

var pageExecute = {

    fileContents:"Null",
    pagePrefix:"Null",
    slides:"Null",

    init: function () {
        $.ajax({
            url: "http://txt2html.sourceforge.net/sample.txt",
            async: false,
            success: function (data){
                pageExecute.fileContents = data;
            }
        });
    }
};

//alert(pageExecute);
var t = 0;
//var lines = new Array();
//lines = allText.split("\n");
//while (t < lines.length){
//setInterval(function(){addBalls(t)},1000);
//t = t + 1;
//}
//document.getElementById("text").innterHTML = allText;

//function addBalls(index){
//document.getElementById("text").innerHTML = lines[index];
//}
=======
/*chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.type == "status") sendResponse({status: localStorage.status});
});*/
>>>>>>> eadf40b80ce441396bd331f3c058f491a33093d6
