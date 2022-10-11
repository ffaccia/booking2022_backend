//const mongoose = require('mongoose')
import mongoose from "mongoose"

const connectDB_ = (url) => {
    mongoose.connect(url, {
            useNewUrlParser: true,
            //useCreateIndex: true,
            //useFindAndModify: false,
            useUnifiedTopology: true,
        })
 
    const db = mongoose.connection
    
    db.on("error", error => console.error(error))
    db.once(["connected", "open"], () => console.log("mongoose connected!"))
    db.once(["disconnected"], () => console.log("mongoose disconnected!"))
    return db
}

export const connectDB = connectDB_
