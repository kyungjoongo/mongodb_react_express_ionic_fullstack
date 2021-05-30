import mongoose from "mongoose";
const schema = mongoose.Schema;

const userSchema = new schema({
    firstName: String,
    lastName: String,
    address: String,
    email: String,
    country: String,
    phone: Number,
    password: String,

});


const userModel = mongoose.model("user", userSchema);

export default userModel