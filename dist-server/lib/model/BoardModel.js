"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

var schema = _mongoose["default"].Schema;
var boardSchema = new schema({
  name: String,
  contents: String,
  title: String,
  createDate: String,
  pwd: String
});

var boardModel = _mongoose["default"].model("board", boardSchema);

var _default = boardModel;
exports["default"] = _default;