const mongoose=require('mongoose')

var UserSchema = mongoose.Schema({
    role:{
        type:String
    },
    name:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    username:{
        type:String
    },
    phonenum:{
        type:Number
    },
    adminId:{
        type:String
    }
})

module.exports=mongoose.model("User",UserSchema);