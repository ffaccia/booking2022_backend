import express from "express";
import { MongoBatchReExecutionError } from "mongodb";
import Hotel from "../models/Hotel.js";
import asyncWrapper from "../controllers/utils.js";
import { verifyAdmin } from "../controllers/middlewares.js";
import {
  getHotel,
  findHotel,
  updateHotel,
  insert_hotel,
  insert_hotel2,
  deleteHotel,
  getCountHotelsByCity,
  getCountByTypes,
} from "../controllers/hotels.js";
import { isNull } from "../commons/_Gen090.js";

const router = express.Router();

router.post("/new", verifyAdmin, insert_hotel2)

router.get("/select/:id", getHotel)

router.get("/findhotel", findHotel)

router.get("/countbycities", getCountHotelsByCity)
router.get("/countbytypes", getCountByTypes)

router.put("/update/:id", verifyAdmin, updateHotel)

router.delete("/delete/:id", verifyAdmin, deleteHotel)



/* much simpler update /*
router.put("/update2/:id", asyncWrapper(async (req, res, next) => {

    const updateHotel = await Hotel.findByIdAndUpdate(req.params.id,         //where
                                          { $set: req.body },    //update
                                          { new: true,
                                            runValidators: true })
    res.status(200).json(updateHotel);
})
)
*/



/*
User.findByIdAndUpdate(id, {
    $set: attributes,
  }, {
    new: true,
    runValidators: true,
  })
  .then((user) => {
    if (!user) {
      // user not found
    }
  
    console.log(user);
  })
  .catch(e => console.log(e));
*/




router.get("/hotels", (req, res) => {
  res.send("auth route from booking2022")
})

export default router