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