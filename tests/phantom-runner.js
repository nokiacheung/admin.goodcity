import system from 'system';
import webpage from 'webpage';

var page = webpage.create();
var url = system.args[1];

page.viewportSize = {
  width: 1024,
  height: 768
};

// The magic!
page.onResourceRequested = (requestData, networkRequest) => {
  if (requestData.url.match('fast.fonts.net')) {
    networkRequest.abort();
  }
};
