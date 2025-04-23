import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
const ProtectRoute=async(req,res,next)=>{
const {jwttokens}=req.body;
try{
const decode=jwt.verify(jwttokens,process.env.TOKEN_KEY);
if(!decode){
    return res.status(400).json({message:"Token not found"});
}
 req.userid=decode.userid;
next();
}
catch(error){
    res.status(500).json({ERROR:"protectRoute Error Error"+error})
}
}
export default ProtectRoute;