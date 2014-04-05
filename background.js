//create an element
var $element = $('<div id="text" class="draggableResizable" />').text("Click me to start your subtitles");

//make it "draggable" and "resizable"
$element.draggable();//.resizable();

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