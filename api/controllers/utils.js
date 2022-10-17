//import dotenv from "dotenv";
//dotenv.config({ path: './.env' })

import do_dotenv from "../config/config.js"
do_dotenv()

import { wrapperConnect } from "../connect/db3.js"

console.log(`${process.env.MONGO_URI}`)

let conn = wrapperConnect(`${process.env.MONGO_URI}`)

const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        //if (!conn)
        conn = wrapperConnect(`${process.env.MONGO_URI}`)

        const session = await conn.startSession();
        try {
            session.startTransaction();
            console.log("start transaction")
            await fn(req, res, next, session)
            await session.commitTransaction();
            console.log("commit transaction")
        } catch (error) {
            console.log(error)
            await session.abortTransaction();
            console.log("transazione abortita")
            next(error)
        }
        session.endSession();
        console.log("end session")
    }
}

export default asyncWrapper