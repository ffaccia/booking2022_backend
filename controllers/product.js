import jwt from "jsonwebtoken";
import Product from "../models/Product.js";
import Size from "../models/Size.js";
import asyncWrapper, { checkBodyFields } from "./utils.js";
import { findSize } from "./sqlHelpers.js";
import { CreateError, CreateError2 } from "./errors.js";
import { StatusCodes, ReasonPhrases } from "http-status-codes";
import * as stringTools from "../commons/_Gen090.js";

const CONST_QUERY_LIMIT = process.env.LIMIT;

const addProduct = asyncWrapper(async (req, res, next, session) => {
  let savedProduct;

  console.log("fracchia");
  console.log(req.body);
  console.log(Object.keys(Product.schema.obj));
  console.log(typeof req.body);

  /* schema, body, allbodyFieldsinSchemaObj=false, noExtraFieldinReqBody=true */
  const ret = 
     checkBodyFields(Object.keys(Product.schema.obj), 
                     Object.keys(req.body));
  console.log(ret);

  try {
    const product = await Product.findOne({ title: req.body.title });
    if (product) {
      return res
        .status(500)
        .json(
          CreateError(
            500,
            `Internal server error. ${req.body.title} already found in db!`
          )
        );
    }

    const sizeret = await findSize(req.body.size);
    console.log("sizeret vale ", sizeret);
    if (sizeret) {
      const product = new Product(req.body);
      savedProduct = await product.save({ session });
      console.log("savedProduct vale ", savedProduct);
      res.status(200).json(savedProduct);
    } else {
      res
        .status(500)
        .json(CreateError(500, `Internal server error. size is not found!`));
    }
  } catch (err) {
    res
      .status(500)
      .json(
        CreateError(
          500,
          `Internal server error ${err} addind Product ${savedProduct}!`
        )
      );
  }
});

const updProduct = asyncWrapper(async (req, res, next, session) => {
  let savedProduct;
  let id = req.params.id;

  try {
    const productdb = await Product.findById({ _id: id });
    if (!productdb) {
      return res
        .status(500)
        .json(CreateError(500, `Product to update not found! ${id}!`));
    }

    const product = await Product.findOne({ title: req.body.title });
    if (product) {
      return res
        .status(500)
        .json(
          CreateError(
            500,
            `Internal server error. New title already present! ${req.body.title} already found in db!`
          )
        );
    }

    const sizeret = await findSize(req.body.size);
    console.log("sizeret vale ", sizeret);
    if (sizeret) {
      const product = new Product(req.body);
      const savedProduct = await Product.findByIdAndUpdate(
        id,
        { $set: req.body },
        { new: true }
      );

      console.log("savedProduct vale ", savedProduct);
      res.status(200).json(savedProduct);
    } else {
      res
        .status(500)
        .json(CreateError(500, `Internal server error. size is not found!`));
    }
  } catch (err) {
    res
      .status(500)
      .json(
        CreateError(
          500,
          `Internal server error ${err} update Product ${savedProduct}!`
        )
      );
  }
});

const delProduct = asyncWrapper(async (req, res, next, session) => {
  let delProduct;
  let id = req.params.id;

  try {
    const productdb = await Product.findById({ _id: id });
    if (!productdb) {
      return res
        .status(500)
        .json(CreateError(500, `Product to delete not found! ${id}!`));
    }
  } catch (err) {
    return res
      .status(500)
      .json(CreateError(500, `Error deleting Product id ${id}!`));
  }

  delProduct = await Product.findByIdAndDelete(id);

  console.log("delProduct vale ", delProduct);
  res.status(200).json(delProduct);
});

const findProduct = asyncWrapper(async (req, res, next, session) => {
  let delProduct;
  let qid = req.query.id;
  let qNew = req.query.new;
  let qCate = req.query.categories;
  let product;

  if (qCate) qCate = stringTools.strToArray(qCate);

  console.log("id vale ", qid);
  console.log(Object.keys(Product.schema.obj));

  try {
    if (qid) {
      product = await Product.findById(qid);
      console.log("product vale ", typeof product);
    } else if (qCate) {
      product = await Product.find({
        categories: {
          $in: qCate,
        },
      });
    } else {
      product = await Product.find();
      console.log("product vale ", typeof product);
      //console.log(product.slice(0, CONST_QUERY_LIMIT));
    }

    return res.status(StatusCodes.OK).json(product.slice(0, CONST_QUERY_LIMIT));
  } catch (err) {
    return res
      .status(500)
      .json(CreateError(500, `Error finding Product id ${qid}!`));
  }
});

export const productControllers = {
  addProduct: addProduct,
  updProduct: updProduct,
  delProduct: delProduct,
  findProduct: findProduct,
};
