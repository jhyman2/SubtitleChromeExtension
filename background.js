// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

// Called whenUpdated creates a new tab.
chrome.tabs.onUpdated.addListener(function(activeTab) {

    chrome.browserAction.setPopup({
        tabId: activeTab.id,          // Set the new popup for this tab.
        popup: 'popup.html'   // Open this html file within the popup.
   });
});
