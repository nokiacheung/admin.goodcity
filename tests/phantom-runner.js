import system from 'system';
import webpage from 'webpage';

const page = webpage.create();
const url = system.args[1];

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
