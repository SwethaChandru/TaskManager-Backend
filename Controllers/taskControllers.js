const Task=require('../Models/taskModel');
var ObjectId = require('mongoose').Types.ObjectId;

module.exports.getTaskByAdmin=(req,res)=>{
    console.log(req.params.id);
    Task.find({adminid:req.params.id},(err,docs)=>{
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
            res.send(docs);
        }
    })
}

module.exports.add=(req,res)=>{
    console.log("enter add book");
    console.log(req.body);
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

module.exports.updateTask=(req,res)=>{
    console.log("enter update task");
    console.log(req.body);
    Task.findByIdAndUpdate({_id:ObjectId(req.body.id)},
        {
             
            $set:{ "title": req.body.title,"description":req.body.description,
            "userAssigned":req.body.userAssigned,"date":req.body.date,"comment":req.body.comment} 
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
