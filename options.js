var backgroundPage = chrome.extension.getBackgroundPage();

function saveOptions(e) {
  for (var name in backgroundPage.headers) {
    backgroundPage.headers[name] = document.getElementById(name).value;
  }
  chrome.storage.sync.set(backgroundPage.headers);
  e.preventDefault();
}

function restoreOptions() {
  var headers = document.getElementById("headers");
  for (var name in backgroundPage.headers) {
    var header = document.createElement("div");
    var label = document.createElement("label");
    var textarea = document.createElement("textarea");
    header.className = "header";
    label.innerText = name + ": ";
    textarea.id = name;
    textarea.value = backgroundPage.headers[name];
    headers.appendChild(header);
    header.appendChild(label);
    header.appendChild(textarea);
  }
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
