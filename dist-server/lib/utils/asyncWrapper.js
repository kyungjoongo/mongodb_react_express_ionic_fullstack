"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asyncWrapper = void 0;

var asyncWrapper = function asyncWrapper(fn) {
  return function (req, res, next) {
    return Promise.resolve(fn(req, res, next))["catch"](next);
  };
};

exports.asyncWrapper = asyncWrapper;