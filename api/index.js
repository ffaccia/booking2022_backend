import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { connectDB } from "./connect/db.js";
import authRouter from "./routes/auth.js"
import usersRouter from "./routes/users.js"
import hotelsRouter from "./routes/hotels.js"
import roomsRouter from "./routes/rooms.js"

const app = express()

app.use("/auth", authRouter)
app.use("/rooms", roomsRouter)
app.use("/hotels", hotelsRouter)
app.use("/users", usersRouter)

if (process.env.NODE_ENV === "test")
    //require("dotenv").parse()
    //const result = dotenv.config()
    dotenv.config({ path: './.env' })
else if (process.env.NODE_ENV === "production")
    dotenv.config({ path: './.env_prod' })



console.log(process.env.NODE_ENV)

const port = process.env.NODE_PORT || 5000;

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
        await connectDB(`${process.env.MONGO_URI}`);
        app.listen(port, () => {
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



