import express from "express";
import httpStatus from "../utils/httpStatus";
import type {TypeRoute} from "../config/Types";
import axios from 'axios'
import videoModel from "../model/VideoModel";

import {Client} from "youtubei";

const youtube = new Client();
const videoRoutes: TypeRoute = express.Router();


// let channleId = 'UCuiM9mzDJi1_R15rHepZyGg'
// let channelName = 'HomT'
let channleId = 'UCBVjMGOIkavEAhyqpxJ73Dw'
let channelName = 'maroon5'

videoRoutes.get("/videos", async (req, res) => {
    try {
        let results = await videoModel.find({
            channelName: 'OneRepublic'
        }).sort({date: -1});

        return res.json(results);

    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error: error.toString()});
    }
});


//todo: GetAll Data
videoRoutes.get("/insertVideos", async (req, res) => {
    try {
        const channel = await youtube.findOne(channleId, {type: "channel"});
        let allvidde = await channel.nextVideos(0); // loa
        allvidde.map(async item => {
            let itemOne = {
                videoId: item.id,
                title: item.title,
                thumbnails: item.thumbnails[3].url,
                channelId: channleId,
                channelName: channelName,
                uploadDate: item.uploadDate,
            }
            await videoModel.create(
                itemOne
            );
        })

        res.json({
            result: 'success'
        });

    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error: error.toString()});
    }
});


export default videoRoutes;
