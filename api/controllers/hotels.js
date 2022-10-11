import asyncWrapper from "./utils.js";
import mw_errors, { CreateError } from "./errors.js";
import Hotel from "../models/Hotel.js";
import { isNull } from "../commons/_Gen090.js";



export const getHotel = asyncWrapper(async (req, res, next, session) => {

    if (isNull(req.params.id)) // req.params.id)) 
        return next(CreateError(500,"request error! req.params.id is null!"))

    //console.log("im an hotel route")

    const hotel = await Hotel.findById(req.params.id);  
    res.status(200).json(hotel);
})



export const insert_hotel = asyncWrapper(async (req, res, next, session) => {

    if (isNull(req.body.id)) // req.params.id)) 
        return next(CreateError(500,"request error! req.body.id is null!"))
    const newHotel = new Hotel(req.body);
    const savedHotel = await newHotel.save({session});
    res.status(200).json(savedHotel);
})



export const insert_hotel2 = asyncWrapper(async (req, res, next, session) => {
    if (isNull(req.body.name)) // req.params.id)) 
        return next(CreateError(500,"request error! req.body.name is null!"))

    const _ = await Hotel.where('name').equals(req.body.name)
    .then((hotel) => {
        if (hotel.length >0) {
    
            console.log(hotel)
            return next(CreateError(500,"request error! req.body.name is already present!"))
        }
    })

    const newHotel = new Hotel(req.body);
    const savedHotel = await newHotel.save({session});
    res.status(200).json(savedHotel);
})



export const updateHotel = asyncWrapper(async (req, res, next, session) => {

   
    if (!isNull(req.body.rating) && isNaN(req.body.rating)) // req.params.id)) 
    //if ((req.body.rating)) // req.params.id)) 
        return next(CreateError(500,"request error! req.body.rating is not a number!"))
    

    const updateHotel = 
    await Hotel.findByIdAndUpdate(req.params.id,         //where
                                  { $set: req.body },    //update
                                  { new: true,
                                   runValidators: true },
                                   { session })
                .then((hotel) => {
                    if (!hotel.length) {
                        console.log("hotel not found")
                        next(CreateError(404,"Hotel not found!"))
                    } else {
                        res.status(200).json(hotel);
                    }
                    console.log(hotel);

                })
                .catch(e => {
                    console.log(e)
                    next()  
                });        //return new version
})



export const deleteHotel = asyncWrapper(async (req, res, next, session) => {

    //const deleteHotel = 
        await Hotel.findByIdAndDelete(req.params.id)
              .then((hotel) => res.status(200).json({success: true}))
              .catch((err) => {
                console.log(err)
                next(CreateError(404,"Hotel not found!"))
               })
})     //where                                         



