// Reads in text file and console logs it
 var fullText;
 var startTimes;
 var endTimes;
 var words;
// var xhr = new XMLHttpRequest();
// xhr.open('GET', 'http://tutorrow.com/subtle_subtitles/example.srt');
// xhr.onreadystatechange = function()
// {
//     if(xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200)
//     {
//         fullText = xhr.responseText;
//         //... The content has been read in xhr.responseText
//     }
// };
// xhr.send();

$.ajax({
  url: "http://tutorrow.com/subtle_subtitles/example.srt",
  dataType: "html",
  success: function(data){
    var lines = data.split('\n');

    lines.forEach(function(currentLine) {
        if (/(.*:.*:.*,.*) --> (.*)/.test(currentLine)){
            console.log(currentLine);
        }
    }); 
  }
});

//create an element
var $element = $('<div id="text" class="draggableResizable" style="z-index: 1000;" />').text("Click me to start your subtitles");

//make it "draggable" and "resizable"
$element.draggable();

//append it to the DOM
$("body").append($element);
// var t = 0;

// $(document).ready(function(){
//   $("#text").click(function(){
//     document.getElementById("text").innerHTML += "That tickles!";
//   });
// });

// var pageExecute = {
//     fileContents:"Null",
//     pagePrefix:"Null",
//     slides:"Null",

//     init: function () {
//         $.ajax({
//             url: "http://txt2html.sourceforge.net/sample.txt",
//             async: false,
//             success: function (data){
//                 pageExecute.fileContents = data;
//             }
//         });
//     }
// };

//console.log(fullText);