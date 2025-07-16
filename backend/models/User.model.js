const mongoose=require('mongoose')

const schema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type:String,
        required:true,
    },
    profilePic:{
        type:String,
        default:""
    },
    institute:{
        type:String,
        default:"",
        set: v => v.toUpperCase()
    },
    degree:{
        type:String,
        default:"",
        set: v => v.toUpperCase()
    },
    year:{
        type:String,
        default:"",
        set: v => v.toUpperCase()
    },
    description:{
        type:String,
        default:"Hey I am using clarify"
    }
},{timestamps:true});
const User = mongoose.model('User', schema);
module.exports=User