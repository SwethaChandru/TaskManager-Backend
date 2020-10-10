const taskModel = require('../Models/taskModel');
const User=require('../Models/userModel');
const Task=require('../Models/taskModel');
var ObjectId = require('mongoose').Types.ObjectId;


module.exports.getTaskForEdit=(req,res)=>{
    taskModel.findById({_id:ObjectId(req.params.id)},(err,docs)=>{
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

module.exports.getTaskByAdmin=(req,res)=>{
    Task.find({adminid:req.params.id},(err,docs)=>{
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

module.exports.getTaskByuser=(req,res)=>{
    Task.aggregate([
        { $match: {userAssigned:req.params.username} },
        { $addFields: { adminid: { $toObjectId: '$adminid' } } },
        {
          $lookup: {
            from: 'users',
            localField: 'adminid',
            foreignField: '_id',
            as: 'products'
          }
        },
        { $unwind: '$products' },
      ]).exec((err,docs)=>{
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.send(docs);
        }  
      })
}

module.exports.add=(req,res)=>{
    const newTask=new Task({
        title:req.body.title,
        description:req.body.description,
        userAssigned:req.body.userAssigned,
        date:req.body.date,
        comments:req.body.comment,
        adminid:req.body.adminid
    })
    newTask.save((err,docs)=>{
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

module.exports.updateDelayStatus=(req,res)=>{
    Task.findByIdAndUpdate({_id:ObjectId(req.body.id)},
        {
            $set:{ "status":req.body.status,"reason":req.body.reason} 
        },
        {
            upsert:true,new:true
        },
        function(err,docs){
            if(err)
            {
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
module.exports.updateComstatus=(req,res)=>{
    Task.findByIdAndUpdate({_id:ObjectId(req.body.id)},
        {
            $set:{ "status":req.body.status} 
        },
        {
            upsert:true,new:true
        },
        function(err,docs){
            if(err)
            {
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

module.exports.updateTask=(req,res)=>{
    Task.findByIdAndUpdate({_id:ObjectId(req.body.id)},
        {
             
            $set:{ "title": req.body.title,"description":req.body.description,
            "userAssigned":req.body.userAssigned,"date":req.body.date,"comments":req.body.comment,
             "status":req.body.status} 
        },
        {
            upsert:true,new:true
        },
        function(err,docs){
            if(err)
            {
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

module.exports.deletetask=(req,res)=>{
    Task.findByIdAndDelete({_id:req.params.id},(err,docs)=>{
        if(err)
        {
            console.log(id);
            res.status(401).json({
                success:false,
                message:'DB error'
            });
        }
        else
        {
            res.status(200).json({
                success:false,
                message:'deleted succesffuly'
            });
        }
    })
}


