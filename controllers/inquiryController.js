
import inquiry from "../Models/inquiry.js";
import { isItAdmin, isItCustomer } from "./usercontroller.js";

export async function addInquiry(req,res){

    try{
        if(isItCustomer(req)){
            const data = req.body;
            data.email = req.user.email;
            data.phone = req.user.phone;

            let id = 0;
            const inquiries = await inquiry.find().sort({id: -1}).limit(1); // sort awarohana vidihata ganna -1 danne

            if(inquiries.length == 0){
                id = 1;
            }else{
                id = inquiries[0].id + 1;
            }

            data.id = id;

            const newInquiry = new inquiry(data);
            const response = await newInquiry.save();

            res.json({massege : "Inquiry added succsfuly", id : response.id})

        }else{
            res.json({massege : "you are not authorized inquiry"})
        }

    }catch(e){
        res.ststus(401).json({massege : "Fail to adding inquiry"})
    }

}

export async function getInquiries(req,res){
    try{
        if(isItCustomer(req)){
            const inquiries = await inquiry.find({email : req.user.email});
                res.json(inquiries);
            }
        else if(isItAdmin(req)){
            const inquiries = await inquiry.find();
            res.json(inquiries);
        }else{
            res.json({massege : "you are not authorized to get inquiries"})
        }
    }catch(e){
        res.status(401).json({massege : "Fail to get inquiries"})
    }
}

export async function deleteInquiry(req,res){
    try{
        if(isItAdmin(req)){
            const id = req.params.id;
            await inquiry.deleteOne({id : id});
            res.json({massege : "Inquiry deleted successfully"})
            return;

        }else if(isItCustomer(req)){
            const id = req.params.id;
            const Inquiry = await inquiry.findOne({id : id});

            if(Inquiry == null){
                res.json({massege : "Inquiry not found"});
                return;

            }else if(Inquiry.email == req.user.email){
                await inquiry.deleteOne({id : id});
                res.json({massege : "Inquiry deleted successfully"})
                return;

            }else{
                res.json({massege : "you are not authorized to delete this inquiry"})
                return;
            }
        }

    }catch(e){
        res.ststus(401).json({massege : "Fail to delete inquiry"})
    }
}

export async function updateInquiry(req,res){
    try{
        if(isItAdmin(req)){
            const id = req.params.id;
            const data = req.body;

            await inquiry.updateOne({id : id},data);
            res.json({massege : "Inquiry updated successfully"})

        }else if(isItCustomer(req)){
            const id = req.params.id;
            const data = req.body;

            const Inquiry = await inquiry.findOne({id : id});
            if(Inquiry == null){
                res.json({massege : "Inquiry not found"});
                return;

            }else if(Inquiry.email == req.user.email){
                await inquiry.updateOne({id : id},{massage : data.massage});
                res.json({massege : "Inquiry updated successfully"})
                return;
            }else{
                res.json({massege : "you are not authorized to update this inquiry"})
                return;
            }
        }else{
            res.json({massege : "you are not authorized to update inquiries"})
        }

    }catch(e){
        res.ststus(401).json({massege : "Fail to update inquiry"})
    }
}