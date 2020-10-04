const bcrypt=require('bcrypt');
const User=require('../Models/userModel');
const jwt=require('jsonwebtoken');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports.getuser=(req,res)=>{
    console.log("enter getuser");
    User.find({adminId:req.params.id},(err,docs)=>{
        if(err){
            res.status(401).json({
                success:false,
                message:'DB error'
            });
        }
        else
        {
           res.send(docs);
        }
    })
}

module.exports.getuserById=(req,res)=>{
    console.log("enter get user by id");
    User.findById({_id:ObjectId(req.params.id)},(err,docs)=>{
        if(err)
        {
            res.status(401).json({
                success:false,
                message:'DB error'
            }); 
        }
        else
        {
            res.send(docs);
        }
    })
}

module.exports.updateUser=(req,res)=>{
    console.log("enter update user");
    console.log(req.body);
    User.findByIdAndUpdate({_id:ObjectId(req.body.id)},
        {
             
            $set:{ "username": req.body.username,"email":req.body.email,
            "password":req.body.password,"name":req.body.name,"role":req.body.role,
            "phonenum":req.body.phonenum} 
        },
        {
            upsert:true,new:true
        },
        function(err,docs){
            if(err)
            {
                console.log(err);
                res.status(401).json({
                    success:false,
                    message:'DB error'
                });
            }
            else
            {
                res.json(docs);
            }
        })   
}

module.exports.deleteuser=(req,res)=>{
    User.findOneAndDelete({_id:ObjectId(req.params.id)},(err,docs)=>{
        if(err){
            res.status(401).json({
                success:false,
                message:'DB error'
            });
        }
        else
        {
            res.status(200).json({
                success:true,
                message:'successfully deleted'
            });
        }
    })
}

module.exports.add=(req,res)=>{
    console.log("enter signup");
    console.log(req.body);

    User.findOne({email:req.body.email},(err,docs)=>{
        if(err){
            res.status(401).json({
                success:false,
                message:'DB error'
            });
        }
        else{
            if(docs===null){
                bcrypt.hash(req.body.password,10)
                .then(hash=>{
                    const user=new User({
                        username:req.body.username,
                        email:req.body.email,
                        password:hash,
                        name:req.body.name,
                        role:req.body.role,
                        phonenum:req.body.phonenum,
                        adminId:req.body.adminId
                    });
                    user.save((err,items)=>{
                        if(err)
                        {
                            res.status(401).json({
                                success:false,
                                message:'DB error'
                            });
                        }
                        else
                        {
                            res.status(200).json({
                                success:true,
                                message:'succesfully sign up'
                            });
                        }
                    })
                    .catch(err=>{
                        res.status(500).json({
                        error:err
                    })
                })
            })
        }
        else
        {
            res.status(401).json({
                success:false,
                message:"email already present"
            })
        }
    }
})
}

module.exports.login=(req,res)=>{
    let fetchedUser;
    console.log(req.body);
    User.findOne({username:req.body.username}).then(user=>{
        console.log(user);
        if(!user)
        {
            return res.status(401).json({
                success:false,
                message:"invalid user name"
            });
        }
        
        fetchedUser=user;
        return bcrypt.compare(req.body.password,user.password);
    })
    .then(result=>{
        if(!result)
        {
            return res.status(401).json({
               success:false,
               message:"invalid password "
            })
        }
        else
        {
            const token=jwt.sign({},'secret_this_should_be_longer',{expiresIn:'1h'});
            res.status(200).json({
            success:true,
            id:fetchedUser._id,
            token:token,
            role:fetchedUser.role
        });
        } 
    })
    .catch(err=>{
        console.log(err);
        return res.status(401).json({
            success:false,
            message:"Auth failed"
        });
    });
}
