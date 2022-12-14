import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        uppercase: true
    },
    type: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true,
        uppercase: true
    },
    address: {
        type: String,
        required: true
    },
    distance: {
        type: String,
        required: true
    },
    photos: {
        type: [String],
        //required: true
    },
    desc: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5
    },
    rooms: {
        type: [String],
        required: true
    },
    cheapest: {
        type: Number,
        required: true
    },
    featured: {
        type: Boolean,
        required: true
    },
    shut: {
        type: Boolean,
        required: true
    }
},
    { timestamps: true }
)




export default mongoose.model("Hotel", HotelSchema)