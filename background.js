//create an element
var $element = $('<div class="draggableResizable" />').text('some text');

//make it "draggable" and "resizable"
$element.draggable();//.resizable();
    
//append it to the DOM
$("body").append($element);

//$("body").append('Test');
