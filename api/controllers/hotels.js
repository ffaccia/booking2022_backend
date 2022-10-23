import asyncWrapper from "./utils.js";
import mw_errors, { CreateError } from "./errors.js";
import Hotel from "../models/Hotel.js";
import { isNull } from "../commons/_Gen090.js";



export const getHotel = asyncWrapper(async (req, res, next, session) => {

    if (isNull(req.params.id)) // req.params.id)) 
        return next(CreateError(500, "request error! req.params.id is null!"))

    console.log("im an hotel route")
    console.log(session)

    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
})



export const insert_hotel = asyncWrapper(async (req, res, next, session) => {

    if (isNull(req.body.id)) // req.params.id)) 
        return next(CreateError(500, `request error! ${req.body.name} is null!`))
    const newHotel = new Hotel(req.body);
    const savedHotel = await newHotel.save({ session });
    res.status(200).json(savedHotel);
})



export const insert_hotel2 = asyncWrapper(async (req, res, next, session) => {
    if (isNull(req.body.name)) // req.params.id)) 
        return next(CreateError(500, `request error! ${req.body.name} is null!`))

    const _ = await Hotel.where('name').equals(req.body.name)
        .then((hotel) => {
            if (hotel.length > 0) {

                console.log(hotel)
                return next(CreateError(500, `request error! ${req.body.name} is already present!`))
            }
        })

    const newHotel = new Hotel(req.body);
    const savedHotel = await newHotel.save({ session });
    res.status(200).json(savedHotel);
})



export const updateHotel = asyncWrapper(async (req, res, next, session) => {


    if (!isNull(req.body.rating) && isNaN(req.body.rating)) // req.params.id)) 
        //if ((req.body.rating)) // req.params.id)) 
        return next(CreateError(500, "request error! req.body.rating is not a number!"))

    console.log("im an hotel route")
    console.log(session)

    const updateHotel =
        await Hotel.findByIdAndUpdate(req.params.id,         //where
            { $set: req.body },    //update
            {
                new: true,
                runValidators: true,
                session: session
            })
            .then((hotel) => {
                if (isNull(hotel._id)) {
                    console.log("hotel not found")
                    next(CreateError(404, "Hotel not found!"))
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
        .then((hotel) => res.status(200).json({ success: true }))
        .catch((err) => {
            console.log(err)
            next(CreateError(404, "Hotel not found!"))
        })
})     //where                                         



export const old_getCountHotelsByCity = asyncWrapper(async (req, res, next) => {
    const cities = req.query.cities.toString()
        .replace(/\s/g, '')
        .toUpperCase()
        .split(",");

    console.log(cities)

    if (cities.length == 0)
        next(CreateError(404, "City not entered!"))

    const list = await Promise.all(cities.map((city) => {
        return Hotel.countDocuments({ city: city })
    }))

    res.status(200).json(list)

})

export const getCountHotelsByCity = asyncWrapper(async (req, res, next) => {
    const cities = req.query.cities.toString()
        .replace(/\s/g, '')
        .toUpperCase()
        .split(",");

    console.log(cities)

    if (cities.length == 0)
        next(CreateError(404, "City not entered!"))

    const list = await Promise.all(cities.map(async (city) => {
        var cnt = await Hotel.countDocuments({ city: city })
        console.log("cnt ", city, " vale ", cnt)
        var obj = {}
        obj['city'] = city
        obj['count'] = cnt
        return obj
    }))
    //console.log(list)
    res.status(200).json(list)

})