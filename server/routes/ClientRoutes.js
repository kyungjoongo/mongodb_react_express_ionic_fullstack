import express from "express";
import clientModel from "../model/ClientModel";
import httpStatus from "../utils/httpStatus";
import type {TypeRoute} from "../config/Types";

const clientRoutes: TypeRoute = express.Router();

//todo: GetAll Data
clientRoutes.get("/clients", async (req, res) => {
    try {
        let results = await clientModel.find({}).sort({date: -1});

        return res.json(results);

    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error: error.toString()});
    }
});

clientRoutes.delete("/clients/:id", async (req, res) => {
    try {
        let _id = req.params.id
        let results = await clientModel.deleteOne({
            _id: _id,
        })
        return res.json(results);

    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error: error.toString()});
    }
});


//todo: Create
clientRoutes.post("/clients", async (req, res, next) => {

    const result = await clientModel.create(
        req.body
    );

    return res.status(httpStatus.CREATED).json({data: {result}});
});


export default clientRoutes;
