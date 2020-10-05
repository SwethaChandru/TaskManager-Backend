const mongoose=require('mongoose')

var TaskSchema = mongoose.Schema({
    title:{
        type:String
    },
    description:{
        type:String
    },
    userAssigned:{
        type:String
    },
    date:{
        type:Date
    },
    comments:{
        type:String
    },
    status:{
        type:String,
        default:"pending"
    },
    adminid:
    {
        type:String
    },
    reason:{
        type:String
    }
})

module.exports=mongoose.model("Task",TaskSchema);