import User from "../models/User.js"
import asyncWrapper from "./utils.js"
import { CreateError } from "./errors.js"
import { isNull } from "../commons/_Gen090.js"

const register = asyncWrapper(async(req, res, next, session) => {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    if (isNull(username) ||
        isNull(email) ||
        isNull(password))
        next(CreateError(500, "one or more arguments missing!"))

    const user = 
    new User(username, email, password)

    const savedUser = await user.save({ session })
              .then((user) => {
                if (user) res.status(201).json(user)
              })
              .catch((err) => CreateError(500, "error creation User resource!"))


              /*const newHotel = new Hotel(req.body);
              const savedHotel = await newHotel.save({session});
              res.status(200).json(savedHotel);              
              */
})


const register2 = asyncWrapper(async(req, res, next, session) => {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    if (isNull(username) ||
        isNull(email) ||
        isNull(password))
        next(CreateError(500, "one or more arguments missing!"))

    const user = 
    new User({username:req.body.username, email:req.body.email, 
              password:req.body.password, salt:req.body.salt})

    const savedUser = await user.save({session});
              res.status(200).json(savedUser);              
          
})

export const userRes = {
    register: register,
    register2: register2
}