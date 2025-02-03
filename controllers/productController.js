import Product from "../Models/product.js";
import { isItAdmin, loginUser } from "./usercontroller.js";

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

export async function getProduct(req,res){

    try{
        if(isItAdmin(req)){
            const products = await Product.find();
            res.json(products);
            return
        }else{
            const products = await Product.find({availability : "false"});
            res.json(products);
            return
        }

    }catch(e){
        res.ststus(500).json({massege : "Failed to get product"})
    }

}

export async function updateProduct(req,res) {

    try{
        if(isItAdmin(req)){
            const key = req.params.key;
            const data = req.body;

            await Product.updateOne({key:key},data);
            res.json({massege :" product update sucssefully"})

        }else{
            res.json({massege : "you are no authorized to profome this action"})
        }

    }catch(e){
        res.ststus(500).json({massege : "fail to update product"})
    }
    
}

export async function deleteProduct(req,res){

    try{
        if(isItAdmin(req)){
            const key = req.params.key;
            
            await Product.deleteOne({key:key})
            res.json({massege : "delete successfully"})

        }else{
            res.json({massege : "you are no authorized to profome this action"})
        }

    }catch(e){
        res.json({massege : "fail to detete product"})
        return
    }

}
