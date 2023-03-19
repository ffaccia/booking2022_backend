import Product from "../models/Product.js";
import Size from "../models/Size.js";
import asyncWrapper from "./utils.js";
import { isNull } from "../commons/_Gen090.js";

export const findSize = async (size) => {
    if (isNull(size) || isNull(size) || isNull(size)) return false;
  
    let retsize; 
    console.log("findSize", size);
    const ret = await Size.findOne({ size: size })
    return ret;
    
  };
  
/*  
export const findSize = async (size) => {
  if (isNull(size) || isNull(size) || isNull(size)) return false;

  let retsize; 
  console.log("findSize", size);
  const ret = await Size.findOne({ size: size }, (err, size) => {
    if(err) {
        return null
        //.status(500)
        //.json(CreateError(500, `Internal server error finding size!`));
        //.json(`Internal server error. size not found!`); 
    } else {
        console.log("dentro findSize ", size)
       return size 
    }
  });

};
*/