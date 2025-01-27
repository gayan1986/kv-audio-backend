import Product from "../Models/product.js";
import { loginUser } from "./usercontroller.js";

export function addProduct(req,res){
    //console.log(req.user)

    if(req.user == null){
        res.status(401).json({massege : "unauthorizd loginUser"})
        return
        }

    if(req.user.role != "admin"){
        res.status(403).json({massege : "you are customer not admin"})
        return
    }
    
    const data = req.body
    const newProduct = new Product(data)
    newProduct.save().then(()=>{
        res.json({message : "Product added successfully"})

    }).catch(()=>{
        res.json({error : "product added failed"})
    })
}