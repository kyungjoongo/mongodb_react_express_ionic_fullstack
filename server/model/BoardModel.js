import mongoose from "mongoose";

const schema = mongoose.Schema;

const boardSchema = new schema({
    name: String,
    contents: String,
    title: String,
    createDate: String,
    pwd: String,
});


const boardModel = mongoose.model("board", boardSchema);

export default boardModel