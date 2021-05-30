"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _development = _interopRequireDefault(require("./env/development"));

var _production = _interopRequireDefault(require("./env/production"));

_mongoose["default"].Promise = Promise;

_mongoose["default"].connection.on("connected", function () {
  console.log("log====>", "MongoDB Connection Established====>>> ".concat(_development["default"].dbConnectionString));
});

_mongoose["default"].connection.on("reconnected", function () {
  console.log("log====>", "MongoDB Connection Reestablished");
});

_mongoose["default"].connection.on("disconnected", function () {
  console.log("log====>", "MongoDB Connection Disconnected");
});

_mongoose["default"].connection.on("close", function () {
  console.log("log====>", "MongoDB Connection Closed");
});

_mongoose["default"].connection.on("error", function (error) {
  console.log("log====>", "MongoDB ERROR: " + error);
  process.exit(1);
}); //todo: Db접속 정보 셋팅 부분..
//todo: Db접속 정보 셋팅 부분..
//todo: Db접속 정보 셋팅 부분..


_mongoose["default"].set("debug", _development["default"].mongoDebug);

var connectMongo = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var connectionuri;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            connectionuri = _development["default"].dbConnectionString;
            _context.next = 3;
            return _mongoose["default"].connect(connectionuri, {
              //autoReconnect: true,
              //reconnectTries: 1000000,
              //reconnectInterval: 3000,
              useNewUrlParser: true,
              useFindAndModify: false,
              useCreateIndex: true,
              useUnifiedTopology: true
            });

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function connectMongo() {
    return _ref.apply(this, arguments);
  };
}();

var _default = connectMongo;
exports["default"] = _default;