
// when you change to a tab where SF is already loaded
chrome.tabs.onActivated.addListener( function(activeInfo){
    chrome.tabs.get(activeInfo.tabId, function(tab){
        checkUrl(tab.url);
    });
});

// when you type SF into address bar of already opened tab
chrome.tabs.onUpdated.addListener((tabId, change, tab) => {
    if (tab.active && change.url) {
        checkUrl(change.url);
    }
});



// if the page is salesforce, set the icon
function checkUrl(url){
  if(String(url).indexOf('salesforce.com') > -1){
    doIcon();
  }
  else{
    // set the icon back to transparent img
    chrome.browserAction.setIcon({ path: "19transparent.png" });
  }
}

// show the browser version in the icon
function doIcon(){

  // get the chrome version
  var chromeVersion = /Chrome\/([0-9.]+)/.exec(navigator.userAgent)[1];
  var major = chromeVersion.substring(0, chromeVersion.indexOf('.'));
  var minor = chromeVersion.substr(chromeVersion.indexOf('.') + 1);

  // setup the canvas element shape
  var canvas = document.createElement('canvas');
  canvas.width = 19;
  canvas.height = 19;
  var ctx = canvas.getContext("2d");

  // major version font face
  ctx.font = "14px Tahoma";
  ctx.fillText(major,2,11);

  // minor version font face
  ctx.font = "9px Tahoma";
  ctx.fillText(minor,1,19);

  // set CS orange color
  ctx.globalCompositeOperation = 'destination-over'
  ctx.fillStyle = "#a9eed1";
  ctx.fillRect(0, 12, canvas.width, canvas.height);

  // set CS green color
  ctx.globalCompositeOperation = 'destination-over'
  ctx.fillStyle = "#FEB118";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // get image data from canvas
  var imageData = ctx.getImageData(0, 0, 19, 19);
  var imageData = ctx.getImageData(0, 0, 19, 19);

  // pass image data to extension icon
  chrome.browserAction.setIcon({
    imageData: imageData
  });

}



