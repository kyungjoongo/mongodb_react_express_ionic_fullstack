"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _httpStatus = _interopRequireDefault(require("../utils/httpStatus"));

var express = require('express');

var sightengine = require('sightengine')('721699261', '6hprE685aFhJT8UcFQg3');

var axios = require('axios');

var faceRoutes = express.Router();

var cheerio = require('cheerio');

var request = require('request');

var fs = require('fs');

var client_ids = ['IJ3GDacUbH4O_zfaMbCQ', '6nGjq4U_Cojcmgly0Fuy', '7DhO7J70Biy2Jz1xa6mX'];
var client_secrets = ['uTURoZKF9N', '7nT2n8KYbV', 'cNuri56BWk'];

var translate = require('translate');

translate.engine = 'google';
translate.key = 'AIzaSyAV-2b3UNzzvFsXWJzOjVTtaRnd1GHLlEU'; //let hostname = 'http://kyungjoon2.ipdisk.co.kr:5001' //@todo://localhost

var hostname = 'http://celme.kyungjoongo.shop';
var baseUrl = './public/images/'; //todo: ###############
//todo: naver face 분석
//todo: ###############

faceRoutes.post('/face_engine_a', function (req, res, next) {
  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }

  var file1 = req.files.file1;
  var postFixRandNo = Math.floor(Math.random() * 500 + 1);
  var fixedName = 'temp_image' + postFixRandNo + '.jpg';
  file1.mv(baseUrl + fixedName, function (err) {
    if (err) {
      return res.status(500).send(err);
    }

    var api_url = 'https://openapi.naver.com/v1/vision/celebrity'; // 유명인 인식

    var _formData = {
      image: fs.createReadStream(baseUrl + fixedName)
    };
    var randClientIdNo = Math.floor(Math.random() * 3 + 0);

    try {
      var _req = request.post({
        url: api_url,
        formData: _formData,
        headers: {
          'X-Naver-Client-Id': client_ids[randClientIdNo],
          'X-Naver-Client-Secret': client_secrets[randClientIdNo]
        }
      }).on('response', function (response) {
        console.log(response.statusCode); // 200

        console.log(response.headers['content-type']);
      });

      console.log(request.head);

      _req.pipe(res); // 브라우저로 출력

    } catch (e) {
      return res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).json({
        error: e.toString()
      });
    }
  });
}); //todo: ###################
//todo: sightengine
//todo: ###################

faceRoutes.post('/face_engine_b', function (req, res, next) {
  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }

  var file1 = req.files.file1;
  var postFixRandNo = Math.floor(Math.random() * 500 + 1);
  var fixedName = 'temp_image' + postFixRandNo + '.jpg';
  file1.mv(baseUrl + fixedName, function (err) {
    if (err) {
      return res.status(500).send(err);
    }

    var imageFullUri = baseUrl + fixedName;

    try {
      sightengine.check(['celebrities']).set_file(imageFullUri).then(function (result) {
        res.json(result);
      });
    } catch (e) {
      return res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).json({
        error: e.toString()
      });
    }
  });
}); //todo: ###############
//todo: starbyface.com
//todo: ###############

faceRoutes.post('/face_engine_c', function (req, res, next) {
  if (!req.files) {
    return res.status(400).send('No files were uploaded.');
  }

  var file1 = req.files.file1;
  var postFixRandNo = Math.floor(Math.random() * 111111111111 + 1);
  var fixedName = 'temp_image' + postFixRandNo + '.jpg';
  var fullImagePath = baseUrl + fixedName;
  console.log(fixedName); // Use the mv() method to place the file somewhere on your server

  file1.mv(fullImagePath, /*#__PURE__*/function () {
    var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(err) {
      var api_url, _result;

      return _regenerator["default"].wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!err) {
                _context.next = 2;
                break;
              }

              return _context.abrupt("return", res.status(500).send(err));

            case 2:
              api_url = 'https://starbyface.com/Home/LooksLike?url=' + hostname + '/images/' + fixedName;
              _context.prev = 3;
              _context.next = 6;
              return axios({
                method: 'post',
                url: api_url,
                timeout: 15 * 1000
              }).then(function (response) {
                var body = response.data;
                var $ = cheerio.load(body);
                var results = [];
                $('.candidate').each(function () {
                  var image = $(this).find('.img-thumbnail').attr('src');
                  var percentage = $(this).find('.progress-bar').attr('similarity');
                  var name = $(this).find('.candidate-main > p ').text();
                  var className = $(this).parent().attr('id');
                  results.push({
                    image: image,
                    percentage: percentage,
                    name: name,
                    className: className
                  });
                });
                console.log("results===>", results);
                return results;
              });

            case 6:
              _result = _context.sent;
              res.json(_result);
              _context.next = 13;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](3);
              return _context.abrupt("return", res.status(_httpStatus["default"].INTERNAL_SERVER_ERROR).json({
                error: _context.t0.toString()
              }));

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[3, 10]]);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
});
var _default = faceRoutes;
exports["default"] = _default;