const Historical = require('../models/historicalModel')

// @desc get historical
// @route GET /api/historical
//@ access PRIVATE manager - user
const getHistorical = async(req, res)=>{
    try{
        const hist = await Historical.find({});
        res.status(200).json(hist)
    }catch(error)
    {
        console.log(error)
        res.status(500).json({msg:'something went wrong'});
    }
}

module.exports = {getHistorical}