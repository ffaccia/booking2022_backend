/* set NODE_ENV=test from command line before start */

import express from "express";
//import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser"
import { wrapperConnect } from "./api/connect/db3.js";
import authRouter from "./api/routes/auth.js"
import usersRouter from "./api/routes/users.js"
import hotelsRouter from "./api/routes/hotels.js"
import mw_errors from "./api/controllers/errors.js"
import roomsRouter from "./api/routes/rooms.js"
import do_dotenv from "./api/config/config.js"

do_dotenv()

const app = express()

app.use(cors())
app.use(cookieParser(process.env.JWT_SECRET));
app.use(express.json());



/*
if (process.env.NODE_ENV === "test") {
    
    //require("dotenv").parse()
    //const result = dotenv.config()
    dotenv.config({ path: './.env' })
} else {
   if (process.env.NODE_ENV === "production")
       dotenv.config({ path: './.env_prod' })

}    
*/

console.log(process.env.NODE_ENV)

const port = process.env.NODE_PORT || 3000;

app.use((req, res, next) => {
    console.log("im a before middleware")
    //res.json("im a before middleware sending something")
    return next()
})

/*
var whitelist = ['http://127.0.0.1', 'localhost']
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}
*/

app.use("/api/auth", authRouter)
app.use("/api/rooms", roomsRouter)
app.use("/api/hotels", hotelsRouter)
app.use("/api/users", usersRouter)

//error handling parachute middleware
app.use(mw_errors)

/*
//mongoose.connect('mongodb://host1:port1/?replicaSet=rsName');
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    //useCreateIndex: true,
    //useFindAndModify: true,
    useUnifiedTopology: true,
    autoIndex: true
})
const db = mongoose.connection
db.on("error", error => console.error(error))
db.once("open", () => console.log("mongoose connected!"))
*/

const start = async () => {
    try {
        await wrapperConnect(`${process.env.MONGO_URI}`);
        app.listen(port, '0.0.0.0', () => {
            console.log(`Server is listening on ${process.env.MONGO_URI} on port ${port}...`)

            //console.log(router)
            //console.log(JSON.stringify(availableRoutes(), null, 2));
            //require('./utils/apiTable')('/api/v1/tasks', router.stack);
            //require('./utils/apiTable')('/api/v1/task', get_patch_delete.stack);
        });
    } catch (error) {
        console.log(error);
    }
};

start()



