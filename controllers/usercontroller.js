import User from "../Models/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export function registerUser(req,res){

    const data = req.body

    data.password = bcrypt.hashSync(data.password,10)

    const newUser = new User(data)

    newUser.save().then(()=>{
        res.json({massage : "User registered successfully"})
        
    }).catch((error)=>{
        res.status(500).json({message : "data base save failed"})
    })
        
}

export function loginUser(req,res){

    const data = req.body;

    User.findOne({
        email : data.email
    }).then(
        (user)=>{
           if(user == null){
                res.status(404).json({error : "user name incorect"})
           }else{
                if(bcrypt.compareSync(data.password, user.password)){  //user pasword == data.pasword ?

                    const token = jwt.sign({
                        fristName : user.fristName,
                        lastName : user.lastName,
                        email : user.email,
                        role : user.role,
                        profilePicture : user.profilePicture,
                        phone : user.phone
                    },"process.env.JWT_SECRET")

                    res.status(200).json({massage : "user login successfull", token : token})
                } else{
                    res.status(401).json({massage : "password incorect"})
                }  
           }
        })

}

export function isItAdmin(req){
    let isadmin = false;
    if(req.user != null){
        if(req.user.role == "admin"){
            isadmin = true;
        }
        return isadmin;
    }
 }

 export function isItCustomer(req){
    let iscustomer = false;
    if(req.user != null){
        if(req.user.role == "customer"){
            iscustomer = true;
        }
    return iscustomer;
    }
 }