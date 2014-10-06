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
    var i, j, sub, twoTimes;

    // Regular expressions to match times
    var patt = new RegExp("(.*:.*:.*,.*) --> (.*)[ \t\n]*");

    // loop through each line
    // if line has a time in it, grab it and then grab each line after until a blank line is reached
    for (i = 0; i < numLines; i++){
        // if line has times on it
        if (patt.test(lines[i])){
            twoTimes = lines[i].split(" --> ");
            i++;

            // read subtitle text until a blank line is reached
            j = i;
            while (lines[j] && lines[j].trim() != "") {
                j++;
            }

            currentSubText = lines.slice(i,j).join("<br>");

            // if text was read, then create a new subtitle object and add it to the finalSubs array
            if (currentSubText){
                // replacing commas with colons to make the time format uniform (ex: 00:00:20,444 becomes 00:00:20:444)
                sub = {
                    startTime: convertTimecodeToMilliseconds(twoTimes[0].replace(",",":")),
                    endTime: convertTimecodeToMilliseconds(twoTimes[1].replace(",", ":")),
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


function showSubtitle(index) {
    currentSub = finalSubs[index];
    document.getElementById("text").innerHTML = currentSub.subText;
    window.setTimeout(function(){eraseThisSubtitle(index);}, currentSub.endTime - currentSub.startTime);
}

function eraseThisSubtitle(index) {
    document.getElementById("text").innterHTML = "";
    if (index + 1 < finalSubs.length) {
        currentSub = finalSubs[index];
        nextSub = finalSubs[index + 1];
        window.setTimeout(function(){showSubtitle(index + 1);}, nextSub.startTime - currentSub.endTime);
    }
}


$(document).ready(function(){
    $("#text").click(function(){
        // Set subtitle text to blank before first one is called
        document.getElementById("text").innerHTML = "waiting for first subtitle";
        window.setTimeout(function(){showSubtitle(0);}, finalSubs[0].startTime);
    });
});

function firstDelay(count, timer){

}


function convertTimecodeToMilliseconds(timecode) {
  timecode = timecode.split(':');
  var hours = timecode[0];
  var minutes = timecode[1];
  var seconds = timecode[2];
  var milliseconds = parseInt(timecode[3]);

  return milliseconds + (seconds * 1000) + (minutes * 60 * 1000) + (hours * 60 * 60 * 1000);
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
