const mongoose = require('mongoose')

const projectSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    adminsList:{
        type:[],
    },
    usersList:{
        type:[],
    },
    status:{ 
        type:String,
        enum:['green','yellow','red'],
    },
    creationDate:{
        type:Date,
        default:Date.now,
    },
    close:{
        type:Boolean,
        default:false,
    }
})
module.exports = mongoose.model('project', projectSchema)