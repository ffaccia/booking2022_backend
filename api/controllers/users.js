import { Types } from "mongoose";
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import asyncWrapper from "./utils.js"
import { CreateError } from "./errors.js"
import { isNull } from "../commons/_Gen090.js"
import { createJWT, attachCookiesToResponse } from "./jwt.js"

const deleteUser = asyncWrapper(async (req, res, next) => {
    console.log("id valeeee ", req.params.id)
    //const userId = Types.ObjectId(req.params.id);
    const userId = Types.ObjectId("634dc088679d985d96b9faaa");
    if (isNull(userId.toString()))
        next(CreateError(500, "user argument missing!"))


    User.findById(userId, async (err, user) => {
        if (err)
            next(CreateError(500, "error removing userId!"))
        if (!user)
            next(CreateError(500, "userId not found!"))

        try {
            await user.remove()
            res.status(200).json(`User ${user_} id ${userId} deleted!`)
        } catch (error) {
            next(CreateError(500, "error removing userId!"))
        }
    })
})


export const userRes = {
    deleteUser: deleteUser
}