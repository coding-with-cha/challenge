const jwt = require('jsonwebtoken')

const authMiddleware = async(req,res,next)=>{
    try{
        const token = req.headers.token
        if(!token) return res.status(401).json({msg: 'token must be provided'});
        const verifyToken = jwt.verify(req.headers.token, process.env.SECRET_KEY);
        req.userId = verifyToken.sub
        next();
    }catch(errors){
        res.status(500).json({msg:'something went wrong'});

    }
}

module.exports = authMiddleware; 