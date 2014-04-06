if(!localStorage.status) localStorage['status'] = 1;
toggle(2);
enable.onclick = function(){toggle(0)};
disable.onclick = function(){toggle(1)};
function toggle(n){
    if((n == 0) && (enable.parentNode == list)){
        list.removeChild(enable);
        list.appendChild(disable);
        localStorage.status = 1;
    }else if((n == 1) && (disable.parentNode == list)){
        list.removeChild(disable);
        list.appendChild(enable);
        localStorage.status = 0;
    }else if((n == 2) && (!list.hasChildNodes())){
        list.appendChild((localStorage.status == 1) ? disable : enable);
        chrome.browserAction.setIcon({path: (localStorage.status == 1) ? "icons/icon19.png" : "icons/icon19_disabled.png"});
    }else{
        return;
    }
}