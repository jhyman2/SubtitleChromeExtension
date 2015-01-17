define(["backbone"], function(Backbone) {

    var App = Backbone.View.extend({

        initialize: function(){

            function startSubs () {
                doInCurrentTab( function(tab){ 
                    console.log('all the buttons');
                    chrome.tabs.executeScript(tab.id, { file: 'static/js/subs.js' }); 
                });
            }

            function fileUpload () {
                doInCurrentTab( function(tab){ 
                    chrome.tabs.executeScript(tab.id, function() {
                        // WHY WONT THIS LOGGGGGG
                        console.log('You wat m8');
                        //  $("ul#upload-subtitles").dropzone({ url: "/file/post" });

                    });
                })
            }

            function doInCurrentTab(tabCallback) {
                chrome.tabs.query(
                    { currentWindow: true, active: true },
                    function (tabArray) { tabCallback(tabArray[0]); }
                );
            }

            $( document ).ready(function() {
                $('#start-subtitles').click(startSubs);
                $('#upload-subtitles').click(fileUpload);
            });
        }
    });
    return App;
});
