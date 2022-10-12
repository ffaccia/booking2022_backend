import User from "../models/User.js"
import asyncWrapper from "./utils.js"
import { CreateError } from "./errors.js"
import { isNull } from "../commons/_Gen090.js"


const register = asyncWrapper(async(req, res, next, session) => {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    test_password()

    if (isNull(username) ||
        isNull(email) ||
        isNull(password))
        next(CreateError(500, "one or more arguments missing!"))

    const user = 
    new User({username:req.body.username, email:req.body.email, 
              password:req.body.password})
    
    const savedUser = await user.save({session});
    res.status(201).json(savedUser);              
    
})


const login = asyncWrapper(async(req, res, next, session) => {
    const email = req.body.email
    const password = req.body.password

    if (isNull(email) ||
        isNull(password))
        next(CreateError(500, "one or more arguments missing!"))

    const user = await User.findOne({ email: email })
    if(!user) next(CreateError(500, "email not found!"))    
    console.log(user)

    const passwordOk = await user.comparePassword(password, user.password);
    if (!passwordOk) {
        return next(CreateError(500, "wrong password!")) 
    }

    res.status(200).json({success: true, login: "ok" })

})



const test_password = () => {
    // create a user a new user
var testUser = new User({
    'username': 'francesco.faccia2',
    'password': 'moscow'
});

// save user to database
testUser.save(function(err) {
    if (err) throw err;

// fetch user and test password verification
User.findOne({ username: 'francesco.faccia2' }, function(err, user) {
    if (err) throw err;

    // test a matching password
    user.comparePassword('moscow', function(err, isMatch) {
        if (err) throw err;
        console.log('moscow:', isMatch); // -> Password123: true
    });

    // test a failing password
    user.comparePassword('123Password', function(err, isMatch) {
        if (err) {
            console.log('123Password:', isMatch)
            throw err
        }    
    });
});
})
}

export const userRes = {
    register: register,
    login: login
}