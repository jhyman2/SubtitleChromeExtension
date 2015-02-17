document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('button').addEventListener('click', function () {
        chrome.runtime.sendMessage({ action: 'browseAndUpload' });
        console.log('tryna')
        window.close();
    });
});