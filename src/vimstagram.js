var mode = "feed";

function setMode(newMode) {
  $('html').removeClass(mode);
  mode = newMode;
  $('html').addClass(mode);
  console.log($('html'));
}

$(document).ready(function() {
  $('body').on('keypress', function(e) {
    switch (mode) {
      case "feed":
        handleKeypressFeed(e);
        break;
      case "photo":
        handleKeypressPhoto(e);
        break;
      case "grid":
        handleKeypressGrid(e);
        break;
      case "explore":
        handleKeypressExplore(e);
        break;
      default:
        console.error('mode was invalid');
        break;
    }
  });

  $("body").on('keydown', function(e) {
    switch (mode) {
      case "feed":
        handleKeydownFeed(e);
        break;
      case "photo":
        handleKeydownPhoto(e);
        break;
      case "grid":
        handleKeydownGrid(e);
        break;
      case "explore":
        handleKeydownExplore(e);
        break;
      default:
        console.error('mode was invalid');
        break;
    }
  });
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResp) {
  // none of these regex escape . because i want to read
  console.log(request.data.url);
  if (request.data.url.match("https?://www.instagram.com/explore/tags/.*")) {
    console.log('exploring a tag');
    setMode("grid");
  } else if (request.data.url.match("https?://www.instagram.com/explore/?")) {
    console.log('explore');
    setMode("explore");
  } else if (request.data.url.match("https?://www.instagram.com/p/.*")) {
    console.log('viewing a photo');
    setMode("photo");
  } else if (request.data.url.match("https?://www.instagram.com/..*/?")) {
    // might be a better regex
    console.log('viewing a profile');
    setMode("grid");
  } else {
    console.log('on the feed');
    setMode("feed");
  }
});
