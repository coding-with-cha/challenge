const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    taskCreator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    projectAssigned:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project'
    },
    status:{
        type:String,
        enum:['New','Active','Done'],
        default:'New',
    },
    creationDate:{
        type:Date,
        default:Date.now,
    },
    completionDate:{
        type:Date
    }
})

module.exports = mongoose.model('task', taskSchema)