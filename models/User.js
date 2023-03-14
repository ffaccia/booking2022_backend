import mongoose from "mongoose"
import bcrypt from "bcryptjs"
import { CreateError } from "../controllers/errors.js"
const SALT_WORK_FACTOR = 10;

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
        required: true,
        minlength: 8,
        maxlength: 20
    },
    salt: {
        type: String,
        //required: true
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

UserSchema.pre('save', function (next) {
    const user = this;
    //console.log(this)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(CreateError(401, "Error saving password!"));
        //console.log("arrivato qui ", salt)
        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(CreateError(401, "Error saving password (2)!"));

            console.log("hash: ", hash)
            // override the cleartext password with the hashed one
            user.password = hash;
            user.salt = salt;
            next();
        });
    })
})

UserSchema.methods.comparePassword = async (candidatePassword, password) => {
    return await bcrypt.compare(candidatePassword, password)
}



/*
UserSchema.methods.isModified = (candidatePassword) => {
    // test a matching password
    this.comparePassword(candidatePassword, function(err, isMatch) {
        if (err) throw err;
            console.log(candidatePassword, isMatch); // -> Password123: true
    });
}
*/

export default mongoose.model('User', UserSchema)