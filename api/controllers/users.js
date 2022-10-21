import { Types } from "mongoose";
import jwt from "jsonwebtoken"
import User from "../models/User.js"
import asyncWrapper from "./utils.js"
import { CreateError } from "./errors.js"
import { isNull } from "../commons/_Gen090.js"
import { createJWT, attachCookiesToResponse } from "./jwt.js"

const deleteUser = asyncWrapper(async (req, res, next) => {
    console.log("id valeeee ", req.params.id)
    const userId = Types.ObjectId(req.params.id);
    //const userId = Types.ObjectId("634dc088679d985d96b9faaa");
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

const updateUser = asyncWrapper(async (req, res, next) => {
    console.log("id val ", req.params.id)
    const userId = Types.ObjectId(req.params.id);
    //const userId = Types.ObjectId("634dc088679d985d96b9faaa");
    if (isNull(userId.toString()))
        next(CreateError(500, "user argument missing!"))

    const user = User.findByIdAndUpdate(userId,
        { $set: req.body },
        { new: true, runValidators: false }, async (err, user) => {
            if (err)
                next(CreateError(500, `error ${err} updating(2) userId!`))
            if (!user)
                next(CreateError(500, "userId not found!"))

            try {
                //await user.save()
                res.status(200).json(`User ${user} id ${userId} updated!`)
            } catch (err) {
                next(CreateError(500, `error ${err} updating(2) userId!`))
            }

        })

    /*
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
    */
})

const getUser = asyncWrapper(async (req, res, next) => {
    const userId = req.params.id
    if (isNull(userId.toString()))
        next(CreateError(500, "user id argument missing!"))

    const user = await User.findById(userId);
    res.status(200).json(user);
})

const getUsers = asyncWrapper(async (req, res, next) => {

    const users = await User.find({}, null, { sort: { createdAt: -1 } });
    res.status(200).json({ count: users.length, data: users });
})


export const userRes = {
    getUser: getUser,
    getUsers: getUsers,
    deleteUser: deleteUser,
    updateUser: updateUser
}