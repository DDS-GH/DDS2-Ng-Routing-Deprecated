export const debug = (msg) => {
  if (typeof msg === 'object') {
    let hasSource = false;
    if (msg.constructor === Array) {
      msg.includes('iAm') && (hasSource = true);
    } else {
      const keys = Object.keys(msg);
      keys.forEach((key, index) => {
        !hasSource && (hasSource = key === 'iAm');
      });
    }
    if (hasSource) {
      console.log(msg);
    } else {
      console.log({ iAm: 'unknown', ...msg });
    }
  } else {
    console.log({ iAm: 'unknown', re: msg });
  }
};

export const xhrAction = (iAm, xhrType, urlPath, callback, params) => {
  if (!iAm || !xhrType || !urlPath || !callback) {
    debug('improper xhr setup');
    return;
  }
  //debug({'iAm': iAm, 'xhrType': xhrType, 'urlPath': urlPath, 'callback': callback, 'params': params});

  // Set up our HTTP request
  var xhr = new XMLHttpRequest();

  // Setup our listener to process completed requests
  xhr.onload = function () {
    // global.states.xhrBusy = false;

    // Process our return data
    if (xhr.status >= 200 && xhr.status < 300) {
      // What do when the request is successful
      //debug("hi")
      var resp = xhr.response;
      if (resp) {
        // resp = JSON.parse(resp).slice().reverse();
        //debug({'iAm': iAm + `Resp`, 're': {'urlPath': urlPath, ...JSON.parse(resp)}});
        callback(resp);
      }
    } else {
      // What do when the request fails
      //debug('XHR Call for ' + iAm + ' failed!');
    }
  };

  // global.states.xhrBusy = true;
  xhr.open(xhrType, urlPath);
  if (params != null) {
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    //debug({'iAm': iAm + ` sendParams`,});
    xhr.send(JSON.stringify(params));
  } else {
    //debug({'iAm': iAm + ` noParams`,});
    xhr.send();
  }
};
