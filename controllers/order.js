import jwt from "jsonwebtoken";
import Product from "../models/Product.js";
import Size from "../models/Size.js";
import asyncWrapper from "./utils.js";
import { findSize } from "./sqlHelpers.js";
import { CreateError, CreateError2 } from "./errors.js";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import * as stringTools from "../commons/_Gen090.js";

const CONST_QUERY_LIMIT = process.env.LIMIT;

const addOrder = asyncWrapper(async (req, res, next, session) => {
  try {
    const newOrder = new Order(req.body);
    savedOrder = await newOrder.save({ session });
    console.log("savedCart vale ", savedOrder);
    res.status(StatusCode.OK).json(savedOrder);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        CreateError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          `Internal server error ${err} adding new Order ${savedOrder}!`
        )
      );
  }
});

const updCart = asyncWrapper(async (req, res, next, session) => {
  let updCart;
  let id = req.body.userid;

  try {
    updCart = await Product.findById(id);
    if (!updCart) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          CreateError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            `Product to update not found! ${id}!`
          )
        );
    }

    updCart = await Product.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    console.log("updCart vale ", updCart);
    res.status(StatusCodes.OK).json(updCart);
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        CreateError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          `Internal server error ${err} update Product ${updCart}!`
        )
      );
  }
});

const delCart = asyncWrapper(async (req, res, next, session) => {
  let delCart;
  let id = req.params.id;

  try {
    const _delcart = await Product.findById(id);
    if (!_delcart) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          CreateError(
            StatusCodes.INTERNAL_SERVER_ERROR,
            `Cart to delete not found! ${id}!`
          )
        );
    }
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        CreateError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          `Cart deleting Product id ${id}!`
        )
      );
  }

  delCart = await Product.findByIdAndDelete(id);

  console.log("delCart vale ", delCart);
  res.status(200).json(delCart);
});

const findCart = asyncWrapper(async (req, res, next, session) => {
  let findCart;
  let qid = req.query.id;
  let quserid = req.query.userid;
  let cart;

  console.log("id vale ", qid);
  try {
    if (qid) {
      findCart = await Product.findById(qid);
      console.log("product vale ", typeof product);
    } else if (quserid) {
      findCart = await Product.findOne({
        userId: quserid,
      });
    } else {
      findCart = await Product.find();
      console.log("product vale ", typeof findCart);
      //console.log(product.slice(0, CONST_QUERY_LIMIT));
    }

    return res.status(StatusCodes.OK).json(findCart);
  } catch (err) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        CreateError(
          StatusCodes.INTERNAL_SERVER_ERROR,
          `Error finding Cart id ${qid}!`
        )
      );
  }
});

export const cartControllers = {
  addCart: addCart,
  updCart: updCart,
  delCart: delCart,
  findCart: findCart,
};
