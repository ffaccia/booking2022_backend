import jwt from "jsonwebtoken";
import Product from "../models/Product.js";
import Size from "../models/Size.js";
import asyncWrapper from "./utils.js";
import { findSize } from "./sqlHelpers.js";
import { CreateError, CreateError2 } from "./errors.js";

const addProduct = asyncWrapper(async (req, res, next, session) => {
  let savedProduct;

  try {
    const product = await Product.findOne({ title: req.body.title });
    if (product) {
        return res
          .status(500)
          .json(CreateError(500, `Internal server error. ${req.body.title} already found in db!`));
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
            .json(CreateError(500, `Internal server error. New title already present! ${req.body.title} already found in db!`));
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
  



export const productControllers = {
  addProduct: addProduct,
  updProduct: updProduct
};
