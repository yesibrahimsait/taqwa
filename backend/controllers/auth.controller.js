import mongoose from "mongoose";
import auths from "../models/auth.model.js";
import { generateToken } from "../utils/generateToken.js";
import becrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
export const signup=async (req,res)=>{
  try{
    const {username,fullname,password,role}=req.body;
    const user=await auths.findOne({username})
    if(user){
        return res.status(404).json({errors:"User Already found"})
    }
    if(!username || !fullname || !password){
        return res.status(404).json({errors:"UserName,fullname and password are Required"})
    }
    if(password.length<6){
        return res.status(404).json({errors:"Password length must be greater than 6"})
    }

    //hashed password
    const salt=await becrypt.genSalt(10)
    const hashedpassword=await becrypt.hash(password,salt)
    const data=[{"username":username,
        "fullname":fullname,
        "password":hashedpassword,
        "role":role=="admin"?"admin":"user"
    }]
    if(!data){
        return res.status(404).json({errors:"No data found for signup"})
    }
    await auths.insertMany(data).then(()=>res.status(200).json({message:"Successfully created"})).catch((err)=>res.status(404).json({errors:"Can't created :"+err}))
  }
  catch(err){
    res.status(500).json({errors:"Signup controll errors :"+err})
  }
}
export const login=async (req,res)=>{
    try{
const {username,password}=req.body;
const user=await auths.findOne({username});

const ispassword=await becrypt.compare(password,user.password);
if(!user || !ispassword){
    return res.status(404).json({errors:"The username and password invalid"})
}
const userid=user._id;
    const token=jwt.sign({userid},process.env.TOKEN_KEY,{expiresIn:"15d"});
res.status(200).json({user,amt:token});
    }
    catch(err){
        res.status(500).json({errors:"The Login controll errors: "+err})
    }
}
export const logout=async(req,res)=>{
    try{
res.cookie("jwt","",{maxAge:0});
res.status(200).json({Message:"The Logout successfully"});
    }
    catch(err){
        res.status(500).json({errors:"The logout control errors: "+err})
    }
}
export const CreateAdmin=async(req,res)=>{
    try{
        const userid=req.userid;
const {username,password,fullname,role}=req.body;
if(!username || !password || !fullname){
    return res.status(404).json(({errors:"The username,password and fullname are required"}))
}
const user=await auths.findOne({username})
if(user){
return res.status(404).json({errors:"Username already found",status:"404-Username already found"})
}
if(password.length<6){
    return res.status(404).json({errors:"Password Length must be greater then or equal to 6"})
}
const salt=await becrypt.genSalt(10);
const hashedpassword=await becrypt.hash(password,salt);
const data=[{
    username,
    fullname,
    password:hashedpassword,
    role
}];
if(!data){
    return res.status(404).json({errors:"No data found to create admin"})
}
await auths.insertMany(data).then(()=>res.status(200).json({message:"Admin Created Successfully"})).catch((er)=>res.status(404).json({errors:"Failed to create admin :"+er}))

    }
    catch(err){
        res.status(500).json({errors:err})
    }
}
export const getrole=async(req,res)=>{
    const {jwttokens}=req.body
    try{
        res.status(200).json({message:jwttokens}) 
    }
    catch(err){
        res.status(500).json({errors:"getrole controller errors"+err})
    }
}
export const getrole2=async(req,res)=>{
    const jwttoke=req.userid;
    
    try{
        
        const user=await auths.findById(jwttoke).select('role');
        if(!user){
            return res.status(404).json({errors:"Username or password incorrect"})
        }
        res.status(200).json({message:user});
    }
    catch(err){
        res.status(500).json({errors:"getrole controller errors"+err})
    }
}
export const demotoken=async(req,res)=>{
    try{
        const {username}=req.body;
       const userid=req.userid;
        const user={username,userid};
        if(!user){
            return res.status(404).json({errors:"Data not fount"})
        }
        res.status(200).json(user)
    }
    catch(er){
        res.status(404).json({errors:"demmotoken controll error :"+er})
    }
    
    
}