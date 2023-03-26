console.log("hello i am here");

import express from "express";
//import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import { wrapperConnect } from "./connect/db3.js";
import { default as doDotEnv } from "./config/config.js";
doDotEnv();

import {
  auth_route,
  user_route,
  prod_route,
  getFromGitHub,
} from "./routes/index.js";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

import  { dolog, dolog2, dolog3 } from "./logger.js";

/*logger.log({
  level: "info",
  message: "ff logger has been started!",
});

logger.log({
  level: "info",
  message: "ff format logger has been started!",
  timestamp: new Date().getTime()
});

*/
//dolog2(" 22new message has been started")

dolog3({
  //label: "thislabel",
  //level: "info",
  message: "z format logger has been started!",
  //timestamp: new Date().getTime()
});


console.log(process.env.NODE_ENV);

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(morgan('tiny'))

const port = process.env.NODE_PORT || 3000;

app.use("/api/user", user_route);
app.use("/api/auth", auth_route);
app.use("/api/product", prod_route);
//app.use("/api/test", getFromGitHub);

const invalidPathHandler = (request, response, next) => {
  response.status(StatusCodes.NOT_FOUND);
  response.send({ err: ReasonPhrases.NOT_FOUND, err2: "invalid path" });
};

const resp = getFromGitHub("patarkf", "https://api.github.com/users");

function getFrom(userName = "patarkf", url = "https://api.github.com/users") {
  console.log(userName, url);
  //console.log(`${url}/${userName}/repos`);
}
getFrom();

/*

app.use((req, res, next) => {
  console.log("im a before middleware");
  //res.json("im a before middleware sending something")
  return next();
});


//app.get("/api/auth", () => console.log("tuttok"))


app.use("/api/auth", authRouter)
app.use("/api/rooms", roomsRouter)
app.use("/api/hotels", hotelsRouter)
app.use("/api/users", usersRouter)

//error handling parachute middleware
app.use(mw_errors)

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

console.log(`${process.env.MONGO_URI}`);
console.log("fra");

const start = async () => {
  try {
    await wrapperConnect(`${process.env.MONGO_URI}`);
    app.listen(port, "0.0.0.0", () => {
      console.log(
        `Server is listening on ${process.env.MONGO_URI} on port ${port}...`
      );

      //console.log(router)
      //console.log(JSON.stringify(availableRoutes(), null, 2));
      //require('./utils/apiTable')('/api/v1/tasks', router.stack);
      //require('./utils/apiTable')('/api/v1/task', get_patch_delete.stack);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
