import express from "express";
import boardModel from "../model/BoardModel";
import httpStatus from "../utils/httpStatus";
import type {TypeRoute} from "../config/Types";

const boardRoutes: TypeRoute = express.Router();

//todo: GetAll Data
boardRoutes.get("/boards", async (req, res) => {
    try {
        let results = await boardModel.find();
        return res.json(results);
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error: error.toString()});
    }
});


//todo: Create
boardRoutes.post("/boards", async (req, res, next) => {

    const result = await boardModel.create(
        req.body
    );

    return res.status(httpStatus.CREATED).json({data: {result}});
});


export default boardRoutes;
