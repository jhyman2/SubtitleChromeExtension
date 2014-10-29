define(["backbone"], function(Backbone) {

    var App = Backbone.View.extend({

        initialize: function(){

            function startSubs () {
                doInCurrentTab( function(tab){ console.log('all the buttons');chrome.tabs.executeScript(tab.id, { file: 'static/js/subs.js' }); } );
            }

            function doInCurrentTab(tabCallback) {
                chrome.tabs.query(
                    { currentWindow: true, active: true },
                    function (tabArray) { tabCallback(tabArray[0]); }
                );
            }

            $( document ).ready(function() {
                $('#start-subtitles').click(startSubs);
            });
        }
    });
    return App;
});
