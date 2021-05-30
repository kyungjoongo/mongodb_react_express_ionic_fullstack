"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
//production.js
var prodConfig = {
  //database
  jwt_key: "",
  jwt_expiration: 360000,
  dbConnectionString: "mongodb://localhost:27017/kyungjoon_test",
  mongoDebug: false
};
var _default = prodConfig;
exports["default"] = _default;