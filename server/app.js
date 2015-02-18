//be sure Long.min.js is already included
/*
 * Calculate OpenSubtitles hash
 * (Oscar Brito - aetheon@gmail.com)
 *
 * @param {File} file - a File obj contained on a DataTransfer
 * @param {Function} onComplete - the result callback
 */

var Long = require('long');
var FileReader = require('filereader');
var Request = require('request');
var http = require('http');

var OpenSubtitlesHash = function(file, onComplete){

    var HASH_CHUNK_SIZE = 64 * 1024;
    if(file.size<HASH_CHUNK_SIZE)
        HASH_CHUNK_SIZE = file.size;


    // sum chunk long values
    var sumChunk = function(arrayBuffer){

        var view = new DataView(arrayBuffer);
        var hNumber = new dcodeIO.Long();

        for(var i=0; i<arrayBuffer.byteLength; i+=8){

            var low = view.getUint32(i, true);
            var high = view.getUint32(i+4, true);

            var n = new dcodeIO.Long(low, high);
            hNumber = hNumber.add(n);
        }

        return hNumber;

    };


    // read chunk
    var readChunk = function(start, end, callback){

        var reader = new FileReader();
        reader.onload = function(e){ 
            
            // sum all long values on the chunk
            var number = sumChunk(e.currentTarget.result);
            
            if(callback)
                callback(number);

        }

        var blob = file.slice(start, end);
        reader.readAsArrayBuffer(blob);
    };


    // read the first chunk
    readChunk(0, HASH_CHUNK_SIZE, function(head){

        // read the tail chunk
        var start = file.size-HASH_CHUNK_SIZE;
        if(start < 0)
            start = 0;

        readChunk(start, file.size, function(tail){

            // sum all values            
            var sum = head.add(tail).add(new dcodeIO.Long(file.size));
            // convert to hex
            var sumHex = sum.toString(16);

            if(onComplete) 
                onComplete(sumHex);

        });

    });
    
};

var firstChunk, contentLength, lastChunk,
    lastChunkRange = 'bytes=',
    url = 'http://fs3.vodlocker.com:8777/kccebbuons4pcnokakichme5wh3evexajmq3rfg2cqauzikm5ay2x7ugbm/v.mp4';


var getHeadInfo = function(){

    var headers = {
        url: url,
        headers: {
            'Accept-Ranges': 'bytes',
            'ETag': 'file.ext_1234_1234567890'
        }
    };

    Request.head(headers, function (error, response, body){
        contentLength = response.headers["content-length"];
        lastChunkRange += (parseInt(contentLength, 10) - 65536 - 1).toString(); // not sure about - 1, think it's necessary
        lastChunkRange += "-" + (parseInt(contentLength, 10) - 1).toString();
        console.log("Content-Length: ", contentLength);
        getFirstChunk();
    });

};

var getFirstChunk = function(){

    var headers = {
        url: url,
        headers: {
            'Accept-Ranges': 'bytes',
            'Content-Range': 'bytes 0-1233/1234',
            'ETag': 'file.ext_1234_1234567890',
            'Range': 'bytes=0-65535'
        }
    };

    // to debug, try getting file on disk and doing same thing
    Request.get(headers, function (error, response, body) {
        console.log("Should be 65536 length: ", body.length);
        firstChunk = body;
        getSecondChunk();
    });
};

var getSecondChunk = function(){

    var headers = {
        url: url,
        headers: {
            'Accept-Ranges': 'bytes',
            'Content-Range': 'bytes 0-1233/1234',
            'ETag': 'file.ext_1234_1234567890',
            'Range': lastChunkRange
        }
    };
    console.log('Range', lastChunkRange);
    Request.get(headers, function (error, response, body) {
        console.log("Should be 65536 length: ", body.length);
        lastChunk = body;
    });

};

getHeadInfo();





// SOME OPEN SUBTITLES STUFF BELOW


// OpenSubtitlesHash('http://fs3.vodlocker.com:8777/kccebbuons4pcnokakichme5wh3evexajmq3rfg2cqauy5d4jf2r7dkize/v.mp4', function(sum){
//     console.log('sum', sum);
// });
                  

// TODO
// $(document).ready(function() {
	
// 	$('#search_field').bind('drop', function(e, ev) {
//         e.preventDefault();
// 		var files = e.originalEvent.dataTransfer.files;
// 		$.each(files, function(index, file) {
			
//             OpenSubtitlesHash(file, function(hash){

//                 // TODO
//                 document.write(hash);

//             })

// 		});
// 	});

// });
