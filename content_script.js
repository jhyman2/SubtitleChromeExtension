//create an element
var $element = $('<div id="text" class="draggableResizable" />').text("Click me to start your subtitles");

//make it "draggable" and "resizable"
$element.draggable();

//append it to the DOM
$("body").append($element);
var t = 0;

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