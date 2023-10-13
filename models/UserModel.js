import mongoose from "mongoose";

const userModel = new mongoose.Schema( {
    name: {
        type: String,
        required: true,
        trim: true
    }, email: {
        type: String,
        unique: true,
        required: true
    }, password: {
        type: String,
        required: true
    }, latitude: {
        type: Number
    }, longitude: {
        type: Number
    }, status: {
        type: String
    }
}, { timestamps: true } );

export default mongoose.model( 'user', userModel );