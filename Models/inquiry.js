import mongoose from "mongoose";

const inquirySchma = new mongoose.Schema({

    id : {
        type : Number,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    massage : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        required : true,
        default : Date.now()
    },
    responce : {
        type : String,
        required : false,
        default : ""
    },
    isResolved : {
        type : Boolean,
        required : true,
        default :false
    }
})

const inquiry = mongoose.model("Inquiry",inquirySchma)

export default inquiry;
