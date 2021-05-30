import express from "express";
import adminModel from "../model/AdminModel";
import httpStatus from "../utils/httpStatus";
import type {TypeRoute} from "../config/Types";

const adminRoutes: TypeRoute = express.Router();

//todo: GetAll Data
adminRoutes.get("/admin", async (req, res) => {
    try {
        let results = await adminModel.find();
        return res.json(results);
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error: error.toString()});
    }
});


//todo: Create
adminRoutes.post("/admin", async (req, res, next) => {
    const result = await adminModel.create(
        req.body
    );
    return res.status(httpStatus.CREATED).json({data: {result}});
});


export default adminRoutes;