import mongoose from "mongoose";

import dbDevConfig from "./env/development";
import dbProdConfig from "./env/production";

mongoose.Promise = Promise;

mongoose.connection.on("connected", () => {
    console.log("log====>", (`MongoDB Connection Established====>>> ${dbDevConfig.dbConnectionString}`))
});


mongoose.connection.on("reconnected", () => {
    console.log("log====>", ("MongoDB Connection Reestablished"))
});


mongoose.connection.on("disconnected", () => {
    console.log("log====>", ("MongoDB Connection Disconnected"))
});


mongoose.connection.on("close", () => {
    console.log("log====>", ("MongoDB Connection Closed"))
});


mongoose.connection.on("error", error => {
    console.log("log====>", ("MongoDB ERROR: " + error));
    process.exit(1);
});

//todo: Db접속 정보 셋팅 부분..
//todo: Db접속 정보 셋팅 부분..
//todo: Db접속 정보 셋팅 부분..
mongoose.set("debug", dbDevConfig.mongoDebug);

const connectMongo = async () => {
    let connectionuri = dbDevConfig.dbConnectionString;
    await mongoose.connect(connectionuri, {
        //autoReconnect: true,
        //reconnectTries: 1000000,
        //reconnectInterval: 3000,
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true

    });
};

export default connectMongo;
