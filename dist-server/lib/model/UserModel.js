"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var schema = _mongoose["default"].Schema;
var userSchema = new schema({
  firstName: String,
  lastName: String,
  address: String,
  email: String,
  country: String,
  phone: Number,
  password: String
});

var userModel = _mongoose["default"].model("user", userSchema);

var _default = userModel;
exports["default"] = _default;