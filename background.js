var headers = {
  "Content-Security-Policy": "",
  "Content-Security-Policy-Report-Only": "default-src 'self'"
};

function addCSPHeaders(e) {
  for (var name in headers) {
    if (headers[name]) {
      e.responseHeaders.push({
        name: name,
        value: headers[name]
      });
    }
  }
  return { responseHeaders: e.responseHeaders };
}

chrome.storage.sync.get(Object.keys(headers), (res) => {
  for (var name in headers) {
    if (typeof res[name] != "undefined") {
      headers[name] = res[name];
    }
  }
});

chrome.webRequest.onHeadersReceived.addListener(
  addCSPHeaders,
  { urls: ["<all_urls>"] },
  [ "blocking", "responseHeaders" ]
);
