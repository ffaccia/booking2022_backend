import jwt from "jsonwebtoken"
import User from "../models/User.js"
import asyncWrapper from "./utils.js"
import { CreateError } from "./errors.js"
import { isNull } from "../commons/_Gen090.js"
import { createJWT, attachCookiesToResponse } from "./jwt.js"

const register = asyncWrapper(async (req, res, next, session) => {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password


    if (isNull(username) ||
        isNull(email) ||
        isNull(password))
        next(CreateError(500, "one or more arguments missing!"))


    const user =
        new User({
            username: req.body.username, email: req.body.email,
            password: req.body.password
        })
    console.log("after new user")


    const savedUser = await user.save({ session });
    console.log("after new user12")
    console.log(user)

    const token = createJWT({ payload: { user: user._id, isadmin: user.isadmin } })
    res.status(201).json(savedUser);

})


const login = asyncWrapper(async (req, res, next, session) => {
    const email = req.body.email
    const password = req.body.password

    if (isNull(email) ||
        isNull(password))
        next(CreateError(500, "one or more arguments missing!"))

    const user = await User.findOne({ email: email })
    if (!user) next(CreateError(500, "email not found!"))
    console.log("ttttttt")
    console.log(password)
    console.log(user.password)
    console.log("ttttttt")

    const passwordOk = await user.comparePassword(password, user.password);
    if (!passwordOk) {
        return next(CreateError(500, "wrong password!"))
    }
    const { password_, isadmin_, ...otherDetails } = user
    console.log(password_)
    console.log(isadmin_)
    console.log(otherDetails)

    //const token = createJWT({ user: user._id, isadmin: user.isadmin })
    attachCookiesToResponse({ res, user })

    res.status(200).json({ details: { ...otherDetails }, isAdmin: isadmin_, success: true, login: "ok" })

})



const test_password = () => {
    // create a user a new user
    var testUser = new User({
        'username': 'francesco.faccia2',
        'password': 'moscow'
    });

    // save user to database
    testUser.save(function (err) {
        if (err) throw err;

        // fetch user and test password verification
        User.findOne({ username: 'francesco.faccia2' }, function (err, user) {
            if (err) throw err;

            // test a matching password
            user.comparePassword('moscow', function (err, isMatch) {
                if (err) throw err;
                console.log('moscow:', isMatch); // -> Password123: true
            });

            // test a failing password
            user.comparePassword('123Password', function (err, isMatch) {
                if (err) {
                    console.log('123Password:', isMatch)
                    throw err
                }
            });
        });
    })
}

export const authRes = {
    register: register,
    login: login
}
