import mongoose from "mongoose";
import auths from '../models/auth.model.js';
import inventory from "../models/inventory.model.js";
export const addinventory=async(req,res)=>{
    const userid=req.userid;
    const adddata=req.body;

    try{
        const user=await auths.findById({_id:userid});
        if(user.role!='admin'){
           return res.status(404).json({errors:"You can't create"})
        }
        if(!adddata){
            return res.status(404).json({errors:"No data found to add inventory or select date currentdate or beforedate"});
        }
      
 await inventory.insertMany(adddata).then(()=>res.status(200).json({message:"Inventory added succesfully"})).catch((er)=>res.status(404).json({errors:"Data can't be added due to duplicate vocher or empty required field:"+er}))
        
    }
   catch(er){
    res.status(404).json({errors:"inventory controll error :"+er})
   } 
}
export const updateinventory=async(req,res)=>{

}
export const getinventory=async(req,res)=>{
    try{
        const userid=req.userid;
        const voucher=req.params.voucher;
        const user=await auths.findOne({_id:userid}).select("-password");
        if(!user){
            return res.status(404).json({errors:"No user found for given token"})
        }
        if(user.role!='admin'){
            return res.status(404).json({errors:"You are restricted to access inventory"})
        }
        const details=await inventory.findOne({voucher})
        if(!details){
            return res.status(404).json({errors:"No data found"})
        }
        res.status(200).json(details);
    }
    catch(er){
        res.status(404).json({errors:"Error in getinventory controll :"+er})
    }
   
}
export const dataupdate=async(req,res)=>{
    try{
const userid=req.userid
const voucher=req.params.voucher;
const {name,address,branch,amount,phone,date}=req.body;
const user=await auths.findOne({_id:userid}).select('-password')
if(!user){
    return res.status(404).json({errors:"InValid Token"})
}
if(user.role!='admin'){
    return res.status(404).json({errors:"You are restricted to Modify"})
}
await inventory.findOneAndUpdate({voucher},{$set:{name,address,branch,amount,phone,date}}).then(()=>res.status(200).json({message:"update success fully"})).catch((er)=>res.status(404).json({errors:"Not updated :"+er}))
    }
    catch(er){
        res.status(404).json({errors:"Data update controll error :"+er})
    }
}
export const deletedata=async(req,res)=>{
    try{
const userid=req.userid;
const voucher=req.params.voucher;
const user=await auths.findOne({_id:userid}).select('-password');
if(!user){
    return res.status(404).json({errors:"Invalid token"})
}
if(user.role!='admin'){
    return res.status(404).json({error:'you are restricted to delete data'})
}
await inventory.findOneAndDelete({voucher}).then(()=>res.status(200).json({message:"Deleted successfully"})).catch((er)=>res.status(404).json({errors:"Not deleted :"+er}))
    }
    catch(er){
        res.status(404).json({erros:"Delete data controll error :"+er})
    }
}
export const getallpendinginv=async(req,res)=>{
    try{
const userid=req.userid;
const user=await auths.findOne({_id:userid}).select("-password")
if(!user){
    res.status(404).json({errors:"Invalid Jwt token"})
}
if(user.role!='admin'){
res.status(404).json({errors:"You are restricted to access Inventory"})
}
const details=await inventory.find({status:"TOPAY"}).select('-year');
if(!details){
    res.status(404).json({errors:"Data not found"})
}
res.status(200).json({details:details});
    }
    catch(er){
        res.status(404).json({errors:"Get all pending inventory controll error :"+er})
    }
}
export const getallpaidinv=async(req,res)=>{
    try{
const userid=req.userid;
const user=await auths.findOne({_id:userid}).select("-password")
if(!user){
    res.status(404).json({errors:"Invalid Jwt token"})
}
if(user.role!='admin'){
res.status(404).json({errors:"You are restricted to access Inventory"})
}
const details=await inventory.find({status:"PAID"}).select('-year');
if(!details){
    res.status(404).json({errors:"Data not found"})
}
res.status(200).json({details:details});
    }
    catch(er){
        res.status(404).json({errors:"Get all pending inventory controll error :"+er})
    }
}
export const Makepaid=async(req,res)=>{
    try{
        const userid=req.userid;
        const voucher=req.params.voucher;
        const {status}=req.body;
       const userrole=await auths.findOne({_id:userid}).select('role')
        if(!userrole){
            return res.status(404).json({errors:"user Not found"})
        }
        if(userrole.role!='admin'){
            return res.status(404).json({errors:"Your role are restricted to Close Account"}) 
        }
await inventory.findOneAndUpdate({voucher},{$set:{status}}).then(()=>res.status(200).json({message:"Payment completed"})).catch(er=>res.status(404).json({errors:"Payment failed to close due to :"+er}))      
    }
    catch(er){
        res.status(404).json({errors:"Make paid controll error: "+er})
    }
}
export const closedAccounts=async(req,res)=>{
    try{
const userid=req.userid;
const user=await auths.findOne({_id:userid}).select('role');
if(!user){
    return res.status(404).json({errors:"user Not found"})
}
if(user.role!='admin'){
    return res.status(404).json({errors:"your role is restriced to get details"})
}
const paid=await inventory.find({status:"PAID"}).select('-password')
if(!paid){
    return res.status(404).json({errors:"No closed Accounts"});
}
res.status(202).json(paid);

    }
    catch(er){
        res.status(404).json({errors:"Close Accounts controll Error :"+er})
    }
}
export const getpaid=async(req,res)=>{
    try{
const userid=req.userid;
const user=await auths.findOne({_id:userid}).select("-password")
if(!user){
    res.status(404).json({errors:"Invalid Jwt token"})
}
if(user.role!='admin'){
res.status(404).json({errors:"You are restricted to access Inventory"})
}
const details=await inventory.find({status:"PAID"}).select('-year');
if(!details){
    res.status(404).json({errors:"Data not found"})
}
res.status(200).json({details:details});
    }
    catch(er){
        res.status(404).json({errors:"Get all pending inventory controll error :"+er})
    }
}
