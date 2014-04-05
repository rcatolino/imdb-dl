var data = require("sdk/self").data;
var mod = require("sdk/page-mod");
var pageWorker = require("sdk/page-worker");
mod.PageMod({
  include: /.*www.imdb.com\/title\/\w*\/.*/,
  contentScriptFile: data.url("adddl.js"),
  onAttach: function(worker) {
    worker.port.on("gotTitle", function(title) {
      pageWorker.Page({
        contentScriptFile: data.url("tpb.js"),
        contentURL: "https://thepiratebay.se/search/" + encodeURI(title) + "/0/7/0",
        onMessage: function(message) {
          worker.port.emit("gotTorrents", message);
        }
      });
    });
  }
});

