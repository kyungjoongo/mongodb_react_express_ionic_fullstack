const {Client} = require("youtubei");
// or for TS / ES6
//import { Client } from "youtubei";/72222
let channleId = 'UCBVjMGOIkavEAhyqpxJ73Dw'
let channelName = 'maroon5'
const youtube = new Client();

async function test001() {
    const channel = await youtube.findOne(channleId, {type: "channel"});
    let allvidde = await channel.nextVideos(0); // loa
    console.log("length-===>", allvidde);

    allvidde.map(item => {
        //console.log("temp-===>",item.thumbnails);
        let itemOne = {
            videoId: item.id,
            title: item.title,
            thumbnails: item.thumbnails[3].url,//    width: 336,            height: 188
            channelId: channleId,
            channelName: channelName,
            uploadDate: item.uploadDate,
        }

        //console.log("itemOne-===>", itemOne);
    })

}

test001();

// await channel.nextVideos();
// //console.log(channel.videos) // first 30 videos
//
// let newVideos = await channel.nextVideos();
// //console.log(newVideos) // 30 loaded videos
// //console.log(channel.videos) // first 60 videos
