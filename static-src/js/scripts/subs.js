function startSubs () {
    // Reads in text file and console logs it
    var finalSubs = [];
    var beenClicked = false;
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
                while (lines[j] && lines[j].trim() !== "") {
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
    var $element = $('<div id="text" class="draggableResizable" style="z-index: 2147483647; position:absolute; float:left; top:150px; left:150px;" />').text("Click me to start your subtitles");

    //make it "draggable" and "resizable"
    $element.draggable();

    //append it to the DOM
    $("body").append($element);

    var subsShowing = [];

    function showSubtitle(index) {
        subsShowing.push(index);
        currentSub = finalSubs[index];
        document.getElementById("text").innerHTML = buildSubtitle();
        window.setTimeout(function(){eraseThisSubtitle(index);}, currentSub.endTime - currentSub.startTime);
        // Spawn the next one if it starts before we end.
        if (index + 1 < finalSubs.length) {
            nextSub = finalSubs[index + 1];
            window.setTimeout(function(){showSubtitle(index + 1);}, nextSub.startTime - currentSub.startTime);
        }
    }

    function eraseThisSubtitle(index) {
        subsShowing.splice(subsShowing.indexOf(index), 1);
        document.getElementById("text").innerHTML = buildSubtitle();
    }

    function buildSubtitle() {
        var i;
        var subtitle = "";
        var subSize = subsShowing.length;
        for (i = subSize - 1; i >= 0; i--) {
            subtitle += (i !== (subSize - 1)  && "<br>" || "") + finalSubs[subsShowing[i]].subText;
        }
        return subtitle;
    }


    $(document).ready(function(){
        $("#text").click(function(){

            // checks to make sure subtitles havent started
            if (!beenClicked){

                beenClicked = true;
                // Set subtitle text to blank before first one is called
                document.getElementById("text").innerHTML = "waiting for first subtitle";
                //console.time("subtitles");
                window.setTimeout(function(){document.getElementById("text").innerHTML = ""; showSubtitle(0);}, finalSubs[0].startTime);
            }
        });
    });

    function convertTimecodeToMilliseconds(timecode) {
      timecode = timecode.split(':');
      var hours = timecode[0];
      var minutes = timecode[1];
      var seconds = timecode[2];
      var milliseconds = parseInt(timecode[3]);

      return milliseconds + (seconds * 1000) + (minutes * 60 * 1000) + (hours * 60 * 60 * 1000);
    }
}

startSubs();

