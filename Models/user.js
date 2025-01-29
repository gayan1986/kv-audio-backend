import mongoose from "mongoose";

const userschema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true 
    },
    role : {
        type : String,
        required : true,
        default : "customer"
    },
    fristName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    profilePicture : {
        type : String,
        required : true,
        default : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFVHR62PqqslJrmbNHhwiH3Cmb99-h10mi6g&s"
    }

});
const User = mongoose.model("User",userschema);

export default User;

