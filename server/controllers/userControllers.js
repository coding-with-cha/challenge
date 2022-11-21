const User = require('../models/userModel');
const bcrypt = require('bcryptjs')
const{validationResult} = require('express-validator')
const jwt = require('jsonwebtoken');

// @desc register new user
// @route POST /api/user/register
//@ access PUBLIC
const register = async(req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const {name, email, password} = req.body;
        const existUser = await User.findOne({email})
        if (existUser) return res.status(400).json({msg:
            'You have already registered'});
        const hashedPassword = await bcrypt.hash(password,10);
        const newPerson = await User.create({name,email,password:hashedPassword});
        res.status(201).json({msg:'user created'})
    }catch(error){
        console.log(error)
        res.status(500).json({msg:'something went wrong'});
    } 
}

// @desc login as user
// @route POST /api/user/login
//@ access PUBLIC
const login = async(req, res)=>{
    try{
        const{email, password}= req.body;
        const existUser = await User.findOne({email})
        if (!existUser) return res.status(400).json({msg:
            'You have to register first.'});
        const validatePassword = await bcrypt.compare(password, existUser.password)
        if(!validatePassword) return res.status(400).json({msg: 'wrong password'});
        const token = await jwt.sign({sub: existUser._id, role: existUser.role},
            process.env.SECRET_KEY,{expiresIn:'30d'});
        res.json({token, role: existUser.role});
    }catch(error)
    {
        console.log(error)
        res.status(500).json({msg:'something went wrong'});
    }
}

// @desc load user info
// @route GET /api/user/userInfo
//@ access PRIVATE - owner
const loadUserInfo = async(req,res)=>{
    try{
        const userInfo = await User.findById(req.userId).select('-password')
        res.json(userInfo) 
    }catch(error)
    {
        console.log(error)
        res.status(500).json({msg:'something went wrong'});
    }
}

// @desc load users
// @route GET /api/user/all
//@ access PRIVATE - manager - admin
const allUsers = async(req,res)=>{
    try{
        const users = await User.find({role: "user"}).select('-password')
        
        res.json(users) 
    }catch(error)
    {
        console.log(error)
        res.status(500).json({msg:'something went wrong'});
    }
}

// @desc get User By id
// @route GET /api/user/:userId
//@ access PRIVATE - owner/manager
const getUserById = async(req, res)=>{
    try{
        const user = await User.find({_id: req.params.userId}).select('-password')
        res.status(200).json(user)
    }catch(error)
    {
        console.log(error)
        res.status(500).json({msg:'something went wrong'});
    }
}

// @desc update a user by id
// @route PUT /api/user/projectList/:userId
//@ access PRIVATE manager
const updateListProjectUser = async(req,res)=>{
    try {        
console.log(req.params.userId)
console.log(req.body.projectId)
        await User.findByIdAndUpdate(req.params.userId,{
            $push:{projectsList:req.body.projectId}
        }) 

        return res.status(200).json({msg:'successfully added'})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'});
    }
}



module.exports = {register,login,loadUserInfo,getUserById, allUsers, updateListProjectUser}
