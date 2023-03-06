import dotenv from "dotenv";
import dotenvExpand from 'dotenv-expand';
import fs from 'fs';
import path from "path";
import { fileURLToPath } from 'url';



/* export default must/might not be named because being default can be imported with 
   any name */
export default () => {
    if (process.env.NODE_ENV === "test") {

        //console.log(import.meta.url)
        //console.log(process.cwd())
        //console.log(path.join(z__dirname, "./.env"))
        /*
        try {
            //fs.accessSync(path.join(z__dirname, "./.env")) ///home/francesco/prjs/nodejs/React/lamadev/booking-site/final/booking2022_backend/api/config/config.js")
            fs.accessSync(path.join(".", "./.env")) ///home/francesco/prjs/nodejs/React/lamadev/booking-site/final/booking2022_backend/api/config/config.js")
            //path.resolve("./fra"));
            console.log('file exists');
        } catch (err) {
            console.log('file not found');
            console.error(err);
        }
        */
        var myEnv = dotenv.config({ path: './.env' })

    } else {
        if (process.env.NODE_ENV === "production")
            var myEnv = dotenv.config({ path: './.env_prod' })
    }
    dotenvExpand.expand(myEnv)

    console.log("mongouri vale")
    console.log(process.env.MONGO_URI)
}