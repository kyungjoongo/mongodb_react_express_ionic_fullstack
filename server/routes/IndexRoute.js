import express from "express";
import type {TypeRoute} from "../config/Types";
import {Client} from 'youtubei'

const indexRoutes: TypeRoute = express.Router();

indexRoutes.get("/", async (req, res, next) => {

    console.log(req.query.q);
    let _query= req.query.q;

    const youtube = new Client();
    const videos = await youtube.search(_query, {
        type: "video", // video | playlist | channel | all
    });

    console.log(videos.length); // 20
    const nextVideos = await videos.next(); // load next page
    console.log(nextVideos.length); // 18-20, inconsistent next videos count from youtube


    console.log("sldfklsdkflkdsf====>", videos);

    return res.json(videos);
});


export default indexRoutes;