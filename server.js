import express from "express";
import bodyParser from "body-parser";
//import morgan from "morgan";
import userRoutes from "./server/routes/UserRoutes";
import connectMongo from "./server/config/mongoConnect";
import adminRoutes from "./server/routes/AdminRoutes";
import clientRoutes from "./server/routes/ClientRoutes";
import boardRoutes from "./server/routes/BoardRoutes";
import faceRoutes from "./server/routes/RouteFaceReconize";
import fileUpload from "express-fileupload"
import indexRoutes from "./server/routes/IndexRoute";
import videoRoutes from "./server/routes/VideoRoute";
const path = require('path');
const ejs = require('ejs');
const app = express();

const cors = require('cors');
const http = require('http').Server(app);

//todo: ####################
//todo: Production enviroment
//todo: ####################
const isProduction = process.env.NODE_ENV === "production";

app.use(fileUpload());

app.set('view engine', 'ejs');
app.set('views', './server/views');

//app.use("/public", express.static(path.join(__dirname, 'images')));

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(cors());

//todo: ####################
//todo: Connect Mongo
//todo: ####################
connectMongo().then(() => {
    console.log("Connected MongoDB====>");
});

//todo: ####################
//todo:  includes Routes
//todo: ####################

app.use("/", userRoutes);
app.use("/", adminRoutes);
app.use("/", clientRoutes);
app.use("/", boardRoutes);
app.use("/", faceRoutes);
app.use("/", indexRoutes);
app.use("/", videoRoutes);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on isProductionss => ${isProduction ? '프로덕션' : '개발'}`);
    console.log(`==========>>>>>>> Server is running on PORT ${PORT}`);
});

// http.listen(PORT, () => {
//     console.log(`listening on *:${PORT}`);
// });

