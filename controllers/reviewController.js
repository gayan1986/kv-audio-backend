import Review from "../Models/review.js";

export function addReview(req,res){
    if(req.user == null){
        res.status(401).json({massege : "Please login and try again"})
        return
    }
    
    const data = req.body;

    data.name = req.user.fristName + req.user.lastName;
    data.profilePicture = req.user.profilePicture;
    data.email = req.user.email;
    
    const newReview = new Review(data);
    
    newReview.save().then(()=>{
        res.json({massege : "Review added succedfully"});
    }).catch((error)=>{
        res.json({error : "Review adding failed"})
    })
}

export function getReview(req,res){

    const user = req.user;
    
    if(user == null || user != "admin"){
        Review.find({isApproved : true}).then((review)=>{
            res.json(review)
        })
    return
    }

    if(user.role == "admin"){
        Review.find().then((review)=>{
            res.json(review);
        })
    }
}

export function deleteReview(req,res){

    const email = req.params.email;

    if(req.user == null){
        res.ststus(401).json({massege : "Please login and try again"})
    return
    }

    if(req.user.role == "admin"){
        Review.deleteOne({email : email}).then(()=>{
            res.json({massege : "Review deleted"})
        }).catch((error)=>{
            res.ststus(500).json({error : "Error deleted"})
        })
     return
    }

    if(req.user.role == "customer"){
        if(req.user.email == email){
            Review.deleteOne({email : email}).then(()=>{
                res.json({massege : "Review deleted"})
            }).catch((error)=>{
                res.ststus(500).json({error : "Error deleted"})
            })
         return     
        }else{
            res.status(403).json({maeege : "you are not authorized to proform this action"})
        }
    }
}

export function approveReview(req,res){

    if(req.user == null){
        res.json({massege : "please login and try again"})
        return
    }

    if(req.user.role == "admin"){
        Review.updateOne(
            {
                email : email
            },
            {
                isApproved : true
            }
    ).then(()=>{
        res.status(200).json({massege : "Review approved successfully"})
    }).catch((error)=>{
        res.status(500).json({error : "Review approved failed"})
    })    
    }else{
        res.status(401).json({massege : "you are not and admin. only admins can approve the review"})
    }
}
