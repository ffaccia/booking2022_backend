import User from "../models/User.js";
import asyncWrapper from "./utils.js";
import { CreateError, CreateError2 } from "./errors.js";
import { isNull } from "../commons/_Gen090.js";
import { createJWT, attachCookiesToResponse } from "./jwt.js";
import { schemas } from "./passValidator.js";

export const getUser = asyncWrapper(async (req, res, next, session) => {
  const id = req.params.id;
  //const password = req.body.password

  console.log("entrato getUser");

  if (isNull(id)) {
    //console.log("one or more argument is missing")
    return next(CreateError(500, "id is missing!"));
  }

  await User.findById(id, (err, user) => {
    if (err) {
      console.log(`User id ${id} does not exist`);
      res.send(CreateError(404, `User id ${id} does not exist`));
      res.end();
      return;
    }

    if (!user) {
      console.log(`User id ${id} does not exist(2)`);
      res.send(CreateError(404, `User id ${id} does not exist(2)`));
      res.end();
      return;
    }

    res.status(200).json({ ...user._doc });
  });
});

export const getAllUser = asyncWrapper(async (req, res, next, session) => {
  //const password = req.body.password

  console.log("entrato getAllUser");
  console.log(Object.keys(User.schema.obj));
  const query = req.query.new;
  const fields = req.query.fields;

  let select;
  try {
    select = [...fields.split(",")];
  } catch (e) {
    console.log(e);
    select = Object.keys(User.schema.obj);
    //return res.status(501).json("error");
  }

  console.log(select);
  let users;
  if (query)
    users = await User.find()
      .select(select)
      //populateselect({ "username": 0, "isadmin": isadminb }).
      .sort({ _id: -1 })
      .limit(5);
  else users = await User.find().select(select);

  res.status(200).json({ len: users.length, users: users });
});

export const getStats = asyncWrapper(async (req, res, next, session) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  const data = await User.aggregate([
    {
      $match: { createdAt: { $gte: lastYear } },
    },
    {
      $project: {
        month: { $month: "$createdAt" },
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: 1 },
      },
    },
  ]);

  res.status(200).json(data);
});

export const getStats2 = asyncWrapper(async (req, res, next, session) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  const data = await User.aggregate([
    {
      $match: { createdAt: { $gte: lastYear } },
    },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" },
        },
        total: { $sum: 1 },
      },
    },
    {
      $sort: {
        month: -1,
      },
    },
  ]);

  res.status(200).json(data);
});

export const authControllers = {
  getUser: getUser,
  getAllUser: getAllUser,
  getStats: getStats,
  getStats2: getStats2,
};
