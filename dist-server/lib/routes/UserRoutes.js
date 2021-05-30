"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _UserModel = _interopRequireDefault(require("../model/UserModel"));

var _httpStatus = _interopRequireDefault(require("../utils/httpStatus"));

var userRoutes = _express["default"].Router(); //todo: GetAll Data


userRoutes.get("/users", /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
    var users;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _UserModel["default"].find();

          case 3:
            users = _context.sent;
            return _context.abrupt("return", res.json(users));

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);
            return _context.abrupt("return", res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).json({
              error: _context.t0.toString()
            }));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 7]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()); //todo: Create

userRoutes.post("/register", /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res, next) {
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _UserModel["default"].find({
              email: req.body.email
            }).exec().then( /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(user) {
                var newUser, _newUser$toObject, password, __v, _user;

                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        if (!(user.length >= 1)) {
                          _context2.next = 4;
                          break;
                        }

                        return _context2.abrupt("return", res.status(_httpStatus["default"].CONFLICT).json({
                          message: "Mail exists"
                        }));

                      case 4:
                        _context2.next = 6;
                        return _UserModel["default"].create({
                          firstName: req.body.firstName,
                          lastName: req.body.lastName,
                          address: req.body.address,
                          email: req.body.email,
                          country: req.body.country,
                          phone: req.body.phone
                        });

                      case 6:
                        newUser = _context2.sent;
                        _newUser$toObject = newUser.toObject(), password = _newUser$toObject.password, __v = _newUser$toObject.__v, _user = (0, _objectWithoutProperties2["default"])(_newUser$toObject, ["password", "__v"]);
                        return _context2.abrupt("return", res.status(_httpStatus["default"].CREATED).json({
                          data: {
                            user: _user
                          }
                        }));

                      case 9:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x6) {
                return _ref3.apply(this, arguments);
              };
            }());

          case 1:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function (_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}()); //todo: GetBy ID

userRoutes.get("/users/:userId", /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return _UserModel["default"].findById(req.params.userId);

          case 3:
            user = _context4.sent;

            if (user) {
              _context4.next = 6;
              break;
            }

            return _context4.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
              message: "User not found"
            }));

          case 6:
            return _context4.abrupt("return", res.json(user));

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).json({
              error: _context4.t0.toString()
            }));

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 9]]);
  }));

  return function (_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}()); //todo: update by ID

userRoutes.put("/users/:userId", /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return _UserModel["default"].findById(req.params.userId);

          case 3:
            user = _context5.sent;

            if (user) {
              _context5.next = 6;
              break;
            }

            return _context5.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
              message: "User not found"
            }));

          case 6:
            Object.assign(user, req.body);
            _context5.next = 9;
            return user.save();

          case 9:
            return _context5.abrupt("return", res.json(user));

          case 12:
            _context5.prev = 12;
            _context5.t0 = _context5["catch"](0);
            return _context5.abrupt("return", res.status(500).json({
              error: _context5.t0.toString()
            }));

          case 15:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[0, 12]]);
  }));

  return function (_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}()); //todo: Delete

userRoutes["delete"]("/users/:userId", /*#__PURE__*/function () {
  var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
    var user;
    return _regenerator["default"].wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return _UserModel["default"].findByIdAndRemove(req.params.userId);

          case 3:
            user = _context6.sent;

            if (user) {
              _context6.next = 6;
              break;
            }

            return _context6.abrupt("return", res.status(_httpStatus["default"].BAD_REQUEST).json({
              message: "User not found"
            }));

          case 6:
            return _context6.abrupt("return", res.json({
              message: "User deleted successfully!"
            }));

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](0);
            return _context6.abrupt("return", res.status(500).json({
              error: _context6.t0.toString()
            }));

          case 12:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[0, 9]]);
  }));

  return function (_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}());
var _default = userRoutes;
exports["default"] = _default;