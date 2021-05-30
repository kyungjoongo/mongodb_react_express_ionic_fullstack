"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _youtubei = require("youtubei");

var indexRoutes = _express["default"].Router();

indexRoutes.get("/", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res, next) {
    var _query, youtube, videos, nextVideos;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            console.log(req.query.q);
            _query = req.query.q;
            youtube = new _youtubei.Client();
            _context.next = 5;
            return youtube.search(_query, {
              type: "video" // video | playlist | channel | all

            });

          case 5:
            videos = _context.sent;
            console.log(videos.length); // 20

            _context.next = 9;
            return videos.next();

          case 9:
            nextVideos = _context.sent;
            // load next page
            console.log(nextVideos.length); // 18-20, inconsistent next videos count from youtube

            console.log("sldfklsdkflkdsf====>", videos);
            return _context.abrupt("return", res.json(videos));

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
var _default = indexRoutes;
exports["default"] = _default;