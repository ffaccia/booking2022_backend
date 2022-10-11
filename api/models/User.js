import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        minlength: 8,
        maxlength: 20
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        minlength: 8,
        maxlength: 100
    },
    password: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    isadmin: {
        type: Boolean,
        default: false
    },
    nation: {
        type: String,
        default: "italia"
    },
},    
    { timestamps: true }
)
export default mongoose.model('User', UserSchema)