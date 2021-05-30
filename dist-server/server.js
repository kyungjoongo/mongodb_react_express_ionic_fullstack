"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _UserRoutes = _interopRequireDefault(require("./lib/routes/UserRoutes"));

var _mongoConnect = _interopRequireDefault(require("./lib/config/mongoConnect"));

var _AdminRoutes = _interopRequireDefault(require("./lib/routes/AdminRoutes"));

var _ClientRoutes = _interopRequireDefault(require("./lib/routes/ClientRoutes"));

var _BoardRoutes = _interopRequireDefault(require("./lib/routes/BoardRoutes"));

var _RouteFaceReconize = _interopRequireDefault(require("./lib/routes/RouteFaceReconize"));

var _expressFileupload = _interopRequireDefault(require("express-fileupload"));

var _IndexRoute = _interopRequireDefault(require("./lib/routes/IndexRoute"));

//import morgan from "morgan";
var path = require('path');

var ejs = require('ejs');

var app = (0, _express["default"])();

var http = require('http').Server(app);

var socketIoInstance = require('socket.io')(http); //todo: ####################
//todo: Production enviroment
//todo: ####################


var isProduction = process.env.NODE_ENV === "production";
app.use((0, _expressFileupload["default"])());
app.set('view engine', 'ejs');
app.set('views', './lib/views'); //app.use("/public", express.static(path.join(__dirname, 'images')));

app.use(_express["default"]["static"](path.join(__dirname, 'public')));
app.use(_bodyParser["default"].json()); //todo: ####################
//todo: Connect Mongo
//todo: ####################

(0, _mongoConnect["default"])().then(function () {
  console.log("Connected MongoDB====>");
}); //todo: ####################
//todo:  includes Routes
//todo: ####################

app.use("/", _UserRoutes["default"]);
app.use("/", _AdminRoutes["default"]);
app.use("/", _ClientRoutes["default"]);
app.use("/", _BoardRoutes["default"]);
app.use("/", _RouteFaceReconize["default"]);
app.use("/", _IndexRoute["default"]);
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Server is running on isProductionss => ".concat(isProduction ? '프로덕션' : '개발'));
  console.log("Server is running on PORT ".concat(PORT));
}); // http.listen(3000, () => {
//     console.log('listening on *:3000');
// });