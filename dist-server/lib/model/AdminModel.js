"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var schema = _mongoose["default"].Schema;
var adminSchema = new schema({
  name: String,
  userId: String,
  userPwd: String,
  nickName: String,
  sex: String,
  phone: Number
});

var adminModel = _mongoose["default"].model("admin", adminSchema);

var _default = adminModel;
exports["default"] = _default;