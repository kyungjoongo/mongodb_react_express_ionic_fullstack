import express from "express";
import userModel from "../model/UserModel";
import httpStatus from "../utils/httpStatus";
import type {TypeRoute} from "../config/Types";
const userRoutes: TypeRoute = express.Router();


//todo: GetAll Data
userRoutes.get("/users", async (req, res) => {
    try {
        let users = await userModel.find();
        return res.json(users);
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error: error.toString()});
    }
});

//todo: Create
userRoutes.post("/register", async (req, res, next) => {

    userModel.find({email: req.body.email}).exec().then(async user => {
        if (user.length >= 1) {
            return res.status(httpStatus.CONFLICT).json({
                message: "Mail exists"
            });

        } else {
            const newUser = await userModel.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                address: req.body.address,
                email: req.body.email,
                country: req.body.country,
                phone: req.body.phone,
            });

            let {password, __v, ...user} = newUser.toObject();
            return res.status(httpStatus.CREATED).json({data: {user}});
        }
    });
});


//todo: GetBy ID
userRoutes.get("/users/:userId", async (req, res) => {
    try {
        let user = await userModel.findById(req.params.userId);
        if (!user) {
            return res.status(httpStatus.BAD_REQUEST).json({message: "User not found"});
        }
        return res.json(user);
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error: error.toString()});
    }
});

//todo: update by ID
userRoutes.put("/users/:userId", async (req, res) => {
    try {
        let user = await userModel.findById(req.params.userId);
        if (!user) {
            return res.status(httpStatus.BAD_REQUEST).json({message: "User not found"});
        }
        Object.assign(user, req.body);
        await user.save();
        return res.json(user);
    } catch (error) {
        return res.status(500).json({error: error.toString()});
    }
});

//todo: Delete
userRoutes.delete("/users/:userId", async (req, res) => {
    try {
        let user = await userModel.findByIdAndRemove(req.params.userId);
        if (!user) {
            return res.status(httpStatus.BAD_REQUEST).json({message: "User not found"});
        }
        return res.json({message: "User deleted successfully!"});
    } catch (error) {
        return res.status(500).json({error: error.toString()});
    }
});


export default userRoutes;