// Reads in text file and console logs it
var finalSubs = [];
$.ajax({
  url: "http://tutorrow.com/subtle_subtitles/example2.srt",
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
                // replacing commas with colons to make the time format uniform (ex: 00:00:20,444 becomes 00:00:20:444)
                var sub = {
                    startTime: convertToMillis(twoTimes[0].replace(",",":")),
                    endTime: convertToMillis(twoTimes[1].replace(",", ":")),
                    subText: currentSubText
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

$(document).ready(function(){
    $("#text").click(function(){

        // Set vars to 0 initially
        var timer = 0.0;
        var count = 0;
        var elapsedTime = 0;
        
        // Set subtitle text to blank before first one is called
        document.getElementById("text").innerHTML = "waiting for first subtitle";

        // while last subtitle has not been reached
        while (timer < finalSubs[finalSubs.length - 1].endTime) {
            // set timer to next subtitle
            timer = finalSubs[count].startTime;

            // after next subtitle time is reached, set the text to it
            window.setTimeout(document.getElementById("text".innerHTML = finalSubs[count].subText), finalSubs[count].startTime - elapsedTime);
            
            // add to elapsed time
            elapsedTime += finalSubs[count].startTime;
            
            // after text has been set, clear it when endTime is reached
            window.setTimeout(document.getElementById("text".innterHTML = ""), finalSubs[count].endTime - elapsedTime);
            
            // add to elapsed time
            elapsedTime += finalSubs[count].endTime;
            
            count++;
        }
    });
}); 

function firstDelay(count, timer){

}

function convertToMillis(unFormatted) {
    var times = unFormatted.split(":");
    var total = parseInt(times[3]);
    total += parseInt(times[2]) * 1000;
    total += parseInt(times[1]) * 60000;
    total += parseInt(times[0]) * 3600000;
    return total;
}

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