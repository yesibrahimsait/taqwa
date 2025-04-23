import jwt from 'jsonwebtoken'
const ProtectRoute2=async(req,res,next)=>{
    //extract Bearer token
    const AuthHeader=req.headers.authorization;
if(!AuthHeader || !AuthHeader.startsWith('Bearer')){
    return res.status(404).json({errors:"invalid or missing authoriztion header"})
}
//extract token(remove Bearer prefix)
const token=AuthHeader.split(' ')[1];
const decode=jwt.verify(token,process.env.TOKEN_KEY);
if(!decode){
    return res.status(404).json({errors:"Token Not Found"})
}
req.userid=decode.userid;
next();
}
export default ProtectRoute2