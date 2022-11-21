const mongoose = require('mongoose')

const historicalSchema = mongoose.Schema({
    entity:{
        type:String,
        enum:['Task','Project']
    },
    historicalArray:{
        type:[]
    }    
})

module.exports = mongoose.model('historical', historicalSchema)