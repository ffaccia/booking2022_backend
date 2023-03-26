//import dotenv from "dotenv";
//dotenv.config({ path: './.env' })

import do_dotenv from "../config/config.js";
do_dotenv();

import { wrapperConnect } from "../connect/db3.js";

console.log(`${process.env.MONGO_URI}`);

const conn = wrapperConnect(`${process.env.MONGO_URI}`);

const asyncWrapper = (fn) => {
  return async (req, res, next) => {
    if (!conn) conn = wrapperConnect(`${process.env.MONGO_URI}`);

    const session = await conn.startSession();
    try {
      session.startTransaction();
      console.log("start transaction");
      await fn(req, res, next, session);
      await session.commitTransaction();
    } catch (error) {
      console.log(error);
      await session.abortTransaction();
      console.log("transazione abortita");
      next(error);
    }
    session.endSession();
  };
};

export const checkBodyFields = (objArray, reqArray, 
                             allObjFieldsinResp=false,
                             noExtraFieldsInBody=true) => {
  //sort not necessary here
  const objArray2 = objArray.slice(0).sort()
  const reqArray2 = reqArray.slice(0).sort()
  
  //every field must be present in req.body
  if(allObjFieldsinResp){
    const ret_allObjFieldsinResp = objArray2.every(value => {
      return reqArray2.includes(value);
    });
    if (!ret_allObjFieldsinResp)
      return false;
  } 
  
  //no extra body fields must be present in req
  if(noExtraFieldsInBody){
    const ret_noExtraFieldsInBody = reqArray2.every(value => {
      return objArray2.includes(value);
    });
    if (!ret_noExtraFieldsInBody)
      return false;  
  }
  return true   
}

export default asyncWrapper;
