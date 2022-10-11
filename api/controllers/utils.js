import dotenv from "dotenv";
dotenv.config({ path: './.env' })

import { connectDB as conn } from "../connect/db.js" 

console.log(`${process.env.MONGO_URI}`)

conn(`${process.env.MONGO_URI}`)
const asyncWrapper = (fn) => {
    return async (req, res, next) => {

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