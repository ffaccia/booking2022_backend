//import dotenv from "dotenv";
//dotenv.config({ path: './.env' })

import do_dotenv from "../config/config.js"
do_dotenv()

import { wrapperConnect } from "../connect/db3.js" 

console.log(`${process.env.MONGO_URI}`)

const conn = wrapperConnect(`${process.env.MONGO_URI}`)
        
const asyncWrapper = (fn) => {
    return async (req, res, next) => {
        if (!conn)
            conn = wrapperConnect(`${process.env.MONGO_URI}`)

        const session = await conn.startSession();
        try {
            session.startTransaction();
            await fn(req, res, next, session)
            await session.commitTransaction();
        } catch (error) {
            await session.abortTransaction();
            next(error)
        }
        session.endSession();
    }
} 

export default asyncWrapper            