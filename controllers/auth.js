import jwt from "jsonwebtoken";

import User from "../models/User.js";
import asyncWrapper from "./utils.js";
import { CreateError, CreateError2 } from "./errors.js";
import { isNull } from "../commons/_Gen090.js";
import { createJWT, attachCookiesToResponse } from "./jwt.js";
import { schemas } from "./passValidator.js";

const register = asyncWrapper(async (req, res, next, session) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  var responso = schemas.passSchema.validate(password);

  console.log(schemas.passSchema.validate("joke", { list: true }));
  console.log(responso);

  if (isNull(username) || isNull(email) || isNull(password))
    next(CreateError(500, "one or more arguments missing!"));

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  console.log("after new user");

  const savedUser = await user.save({ session });
  console.log("after new user11");
  console.log(savedUser);
  console.log("after new user12");
  console.log(user);

  const payload = { _id: user._id, isadmin: user.isadmin };
  console.log(payload);
  console.log("after new user13");
  attachCookiesToResponse({ res, payload });
  /*
  const token = createJWT({
    payload: { user: user._id, isadmin: user.isadmin },
  });
  */
  res.status(201).json(savedUser);
});

const login = asyncWrapper(async (req, res, next, session) => {
  const email =
    typeof req.body.email === "object" ? req.body.email[0] : req.body.email;
  const password =
    typeof req.body.password === "object"
      ? req.body.password[0]
      : req.body.password;
  //const password = req.body.password

  if (isNull(email) || isNull(password)) {
    //console.log("one or more argument is missing")
    return next(CreateError(500, "one or more arguments missing!"));
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    console.log("emailnotfound");
    return next(CreateError2(500, "email not found!"));
  }

  //can be written like that too:
  //(!user) && res.status(401).json("Bad credentials!")

  console.log(user);
  console.log(password);
  const passwordOk = await user.comparePassword(password, user.password);
  if (!passwordOk) {
    //res.status(403).json({ error: CreateError(404, "wrong password!") })
    return next(CreateError(401, "wrong password!"));
  }

  //mongodb passes a lot of other infos attached to the record; actual record is in _doc and destructuring fields we get just what we need.
  const { isadmin, ...otherDetails } = user._doc;
  //const { isadmin, ...otherDetails } = user;

  console.log("isadmin ", isadmin);
  //console.log(otherDetails)

  res.cookie("user1", "francesco1", { maxAge: 10000800 });
  //const token = createJWT({ user: user._id, isadmin: user.isadmin })
  const payload = user;
  attachCookiesToResponse({ res, payload });
  res.cookie("user2", "francesco2", { maxAge: 10000800 });
  console.log("res.getHeaders");
  console.log(res.getHeaders());
  //console.log(res.cookie)
  res.status(200).json({
    date: new Date(),
    details: { ...otherDetails },
    isAdmin: isadmin,
    success: true,
    login: "ok",
  });
});

const logout = asyncWrapper(async (req, res, next, session) => {
  res.clearCookie("access-token");
  console.log("entro logout");
  //res.status(200).json({ date: new Date(), logout: "ok" })
  res.send("logout"); //redirect('/');
});

const test_password = () => {
  // create a user a new user
  var testUser = new User({
    username: "francesco.faccia2",
    password: "moscow",
  });

  // save user to database
  testUser.save(function (err) {
    if (err) throw err;

    // fetch user and test password verification
    User.findOne({ username: "francesco.faccia2" }, function (err, user) {
      if (err) throw err;

      // test a matching password
      user.comparePassword("moscow", function (err, isMatch) {
        if (err) throw err;
        console.log("moscow:", isMatch); // -> Password123: true
      });

      // test a failing password
      user.comparePassword("123Password", function (err, isMatch) {
        if (err) {
          console.log("123Password:", isMatch);
          throw err;
        }
      });
    });
  });
};

const updateUser = asyncWrapper(async (req, res, next, session) => {
  const id = req.params.id;
  //const password = req.body.password

  console.log("entrato updateUser");

  if (isNull(id)) {
    //console.log("one or more argument is missing")
    return next(CreateError(500, "id is missing!"));
  }

  await User.findByIdAndUpdate(
    id, //where
    { $set: req.body }, //update
    { new: true, runValidators: true,
      session: session }
  )

  .then((user) => {
    console.log(user);
    if (!user.email) {
      console.log("user not found");
      res.status(500).json(CreateError(404, "User not found!"));
    } else {
      console.log("user found ", user.email);
      res.send(user);
    }
    
  })

  .catch((e) => {
    console.log(e);
    res.status(500).json(CreateError(500, "Internal server error!"));
  });

});

export const authControllers = {
  register: register,
  login: login,
  logout: logout,
  updateUser: updateUser,
};
