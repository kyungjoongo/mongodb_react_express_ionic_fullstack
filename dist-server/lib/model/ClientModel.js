"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var schema = _mongoose["default"].Schema;
var clientSchema = new schema({
  name: String,
  clientId: String,
  clientPwd: String,
  nickName: String,
  sex: String,
  phone: Number
});

var clientModel = _mongoose["default"].model("client", clientSchema);

var _default = clientModel;
exports["default"] = _default;