"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _require = require("youtubei"),
    Client = _require.Client; // or for TS / ES6


var run = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var youtube, videos, nextVideos;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            youtube = new Client();
            _context.next = 3;
            return youtube.search("one republic", {
              type: "video" // video | playlist | channel | all

            });

          case 3:
            videos = _context.sent;
            console.log(videos.length); // 20

            _context.next = 7;
            return videos.next();

          case 7:
            nextVideos = _context.sent;
            // load next page
            console.log(nextVideos.length); // 18-20, inconsistent next videos count from youtube

            console.log("sldfklsdkflkdsf====>", videos); // console.log(videos.length); // 38 - 40
            //
            // // you can also pass the video URL
            // const video = await youtube.getVideo("dQw4w9WgXcQ");
            //
            // const channelVideos = await video.channel.getVideos();
            // const channelPlaylists = await video.channel.getPlaylists();
            //
            // // you can also pass the playlist URL
            // const playlist = await youtube.getPlaylist("UUHnyfMqiRRG1u-2MsSQLbXA");
            // console.log(playlist.videos.length); // first 100 videos;
            // let newVideos = await playlist.next(); // load next 100 videos
            // console.log(playlist.videos.length); // 200 videos;
            // await playlist.next(0); // load the rest videos in the playlist

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function run() {
    return _ref.apply(this, arguments);
  };
}();

run();