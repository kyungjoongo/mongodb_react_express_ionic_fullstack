import mongoose from "mongoose";

const schema = mongoose.Schema;

const videoSchema = new schema({
    videoId: String,
    title: String,
    thumbnails: String,
    channelId: String,
    channelName: String,
    uploadDate: String,
});


const videoModel = mongoose.model("video", videoSchema);

export default videoModel
