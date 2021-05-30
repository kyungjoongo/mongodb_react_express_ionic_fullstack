"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
//development.js
var devConfig = {
  jwt_key: "",
  jwt_expiration: 360000,
  dbConnectionString: "mongodb://localhost:27017/kyungjoon_test",
  mongoDebug: true
};
var _default = devConfig;
exports["default"] = _default;