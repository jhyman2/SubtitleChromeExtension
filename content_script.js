// Reads in text file and console logs it
var finalSubs = [];
$.ajax({
  url: "http://tutorrow.com/subtle_subtitles/example.srt",
  dataType: "html",

  // called when remote file is grabbed
  success: function(data){
    // lines is an array of every line in the subtitle file
    var lines = data.split('\n');
    var numLines = lines.length;
    var i;
    
    // Regular expressions to match times and non-whitespace lines
    var patt = new RegExp("(.*:.*:.*,.*) --> (.*)[ \t\n]*");
    var patt2 = new RegExp(".+");

    var count = 0;

    // loop through each line 
    // if line has a time in it, grab it and then grab each line after until a blank line is reached
    for (i = 0; i < numLines; i++){
        // if line has times on it
        if (patt.test(lines[i])){
            count++;
            var twoTimes = lines[i].split(" --> ");
            var currentSubText = "";
            i = i + 1;
            // read subtitle text until a blank line is reached
            while(patt2.test(lines[i]) && lines[i]){
                if (currentSubText != ""){
                    currentSubText = currentSubText.concat("\n");
                }
                currentSubText = currentSubText.concat(lines[i]);
                i = i +1;
            }

            // if text was read, then create a new subtitle object and add it to the finalSubs array
            if (currentSubText){
                var sub = {
                    startTime: twoTimes[0],
                    endTime: twoTimes[1],
                    text: currentSubText
                };
                finalSubs.push(sub);
            }
        }
    }
    // log the subtitles
    console.log(finalSubs);
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
//     var timer = 0.0;
//     var count = 0;
//     document.getElementById("text").innerHTML = "Subtitles starting...";

//     while (timer < finalSubs[finalSubs.length - 1]){
//         timer = finalSubs[count++].startTime;
//         window.setTimeout("javascript function", timer);
//     }
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