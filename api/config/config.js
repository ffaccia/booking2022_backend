import dotenv from "dotenv";
import dotenvExpand from 'dotenv-expand'



/* export default must/might not be named because being default can be imported with 
   any name */
export default () => {
    if (process.env.NODE_ENV === "test") {
        
        //require("dotenv").parse()
        //const result = dotenv.config()
        var myEnv = dotenv.config({ path: './.env' })
    } else {
    if (process.env.NODE_ENV === "production")
        var myEnv = dotenv.config({ path: './.env_prod' })
    }    
    dotenvExpand.expand(myEnv)

    console.log("mongouri vale")
    console.log(process.env.MONGO_URI)
}