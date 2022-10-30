import Room from "../models/Room.js"
import Hotel from "../models/Hotel.js"
import asyncWrapper from "./utils.js"
import { CreateError } from "./errors.js"

const insertRoom = asyncWrapper(async (req, res, next, session) => {
    const hotelId = req.params.id
    const savedRoom = await new Room(req.body).save({ session: session })

    console.log("------")
    console.log(hotelId)
    console.log(savedRoom)

    const hotelRooms = await Hotel.findByIdAndUpdate(hotelId,
        { $push: { rooms: savedRoom._id } },
        { new: true, runValidators: false,
         session: session })
        .then((hotel) => {
            if (!hotel)
                next(CreateError(500, "hotelId not found!"))

            try {
                //await user.save()
                res.status(200).json(`Rooms added for hotel ${hotelId}!`)
            } catch (err) {
                next(CreateError(500, `Error adding rooms for hotel ${hotelId}!`))
            }

        })
        .catch((err) => {
            if (err)
                next(CreateError(500, `error ${err} updating(2) hotelId!`))
        })

})


export const deleteRoom = asyncWrapper(async (req, res, next, session) => {
    const hotelId = req.params.id
    const roomId = req.params.room
    
    const numRooms = await Hotel.countDocuments({ _id: hotelId, rooms: { "$in": [roomId] }} )
    if(numRooms == 0)
        next(CreateError(500, "Couple hotelId/roomId not found!"))
        
    const hotelRooms = await Hotel.findByIdAndUpdate(hotelId,
        { $pull: { rooms: roomId } },
        { new: true, runValidators: false, session: session })
    .then(async (hotel) => {
        if (!hotel)
            next(CreateError(500, "hotelId not found!"))
        else {
             await Room.findByIdAndDelete(roomId, { session: session })
            .then((room) => {
                if(!(room))
                    next(CreateError(500, `Room ${roomId} of Hotel ${hotelId} not found!`))
                
                console.log("ecco room")
                console.log(room)
                res.status(200).json(`Room ${roomId} of Hotel ${hotelId} deleted!`)
            })
            .catch((err) => next(CreateError(500, `Room ${roomId} of Hotel ${hotelId} not found. err ${err}!`)))
        }})

    .catch((err) => {
           next(CreateError(500, `Error adding rooms for hotel ${hotelId}!`))
    })

})


export const updateRoom = asyncWrapper(async (req, res, next, session) => {

    if (!isNull(req.body.rating) && isNaN(req.body.rating)) // req.params.id)) 
        //if ((req.body.rating)) // req.params.id)) 
        return next(CreateError(500, "request error! req.body.rating is not a number!"))

    const updateRoom =
        await Room.findByIdAndUpdate(req.params.id,         //where
            { $set: req.body },    //update
            {
                new: true,
                runValidators: true,
                session: session
            })
            .then((room) => {
                if (isNull(room._id)) {
                    console.log("room not found")
                    next(CreateError(404, "Room not found!"))
                } else {
                    res.status(200).json(room);
                }
                console.log(room);

            })
            .catch(e => {
                console.log(e)
                next()
            });        //return new version
})


export const getRoom = asyncWrapper(async (req, res, next, session) => {

    if (isNull(req.params.id)) // req.params.id)) 
        return next(CreateError(500, "request error! req.params.id is null!"))

    const room = await Room.findById(req.params.id);
    res.status(200).json(room);
})


export const getRooms = asyncWrapper(async (req, res, next, session) => {

    if (isNull(req.params.id)) // req.params.id)) 
        return next(CreateError(500, "request error! req.params.id is null!"))

    const rooms = await Room.find({});
    res.status(200).json(rooms);
})


export const updateRoomAvailability = async (req, res, next) => {
    try {
        await Room.updateOne(
            { "roomNumbers._id": req.params.id },
            {
                $push: {
                    "roomNumbers.$.unavailableDates": req.body.dates
                },
            }
        );
        res.status(200).json("Room status has been updated.");
    } catch (err) {
        next(err);
    }
};


export const roomRes = {
    getRoom: getRoom,
    getRooms: getRooms,
    insertRoom: insertRoom,
    deleteRoom: deleteRoom,
    updateRoom: updateRoom,
    updateRoomAvailability: updateRoomAvailability
}