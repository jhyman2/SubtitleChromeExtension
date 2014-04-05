//var fn = function(){


//create an element
var $element = $('<div id="text" class="draggableResizable" />').text("Click me to start your subtitles");

//make it "draggable" and "resizable"
$element.draggable();//.resizable();

//append it to the DOM
$("body").append($element);
var t = 0;
//var lines = new Array();
var lines = new Array();
var allText;
var txtFile = new XMLHttpRequest();
txtFile.open("GET", "http://txt2html.sourceforge.net/sample.txt", true);
txtFile.onreadystatechange = function()
{
  if (txtFile.readyState === 4) {  // document is ready to parse.
    if (txtFile.status === 200) {  // file is found
		allText = txtFile.responseText;
		document.getElementById("text").innterHTML += allText;
	}
  }
};
txtFile.send(null);

//lines = allText.split("\n");
//while (t < lines.length){
//setInterval(function(){addBalls(t)},1000);
//t = t + 1;
//}
//document.getElementById("text").innterHTML = allText;

//function addBalls(index){
//document.getElementById("text").innerHTML = lines[index];
//}
/*};
chrome.runtime.sendMessage({type: "status"}, function(response) {
    if(response.status == 1) fn();
    return;
});*/