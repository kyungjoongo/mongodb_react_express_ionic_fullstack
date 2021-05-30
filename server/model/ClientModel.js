import mongoose from "mongoose";

const schema = mongoose.Schema;

const clientSchema = new schema({
    name: String,
    clientId: String,
    clientPwd: String,
    nickName: String,
    sex: String,
    phone: Number,
    content: String,
    age: Number,
    date: {
        type: Date,
        default: Date.now(),
    },
    image: String,
});


const clientModel = mongoose.model("client", clientSchema);

export default clientModel
