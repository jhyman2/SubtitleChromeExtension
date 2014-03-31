//create an element
var $element = $('<div id="text" class="draggableResizable" />').text("Some balls");

//make it "draggable" and "resizable"
$element.draggable();//.resizable();

//append it to the DOM
$("body").append($element);
var t = 10;

while (t != 0){
setInterval(function(){addBalls()},1000);
t = t - 1;
}

function addBalls(){
var d=new Date();
var f=d.toLocaleTimeString();
document.getElementById("text").innerHTML = f;
}