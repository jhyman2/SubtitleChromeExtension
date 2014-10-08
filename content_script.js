function startSubs () {
    doInCurrentTab( function(tab){ chrome.tabs.executeScript(tab.id, { file: 'subs.js' }); } );
}

function doInCurrentTab(tabCallback) {
    chrome.tabs.query(
        { currentWindow: true, active: true },
        function (tabArray) { tabCallback(tabArray[0]); }
    );
}

function init() {
    $('#start-subtitles').click(startSubs);
}


document.addEventListener('DOMContentLoaded', init);

