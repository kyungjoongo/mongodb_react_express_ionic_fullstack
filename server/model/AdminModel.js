import mongoose from "mongoose";
const schema = mongoose.Schema;

const adminSchema = new schema({
    name: String,
    userId: String,
    userPwd: String,
    nickName: String,
    sex: String,
    phone: Number,
});


const adminModel = mongoose.model("admin", adminSchema);

export default adminModel