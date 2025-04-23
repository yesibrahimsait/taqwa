import jwt from 'jsonwebtoken';
export const generateToken=(userid,res)=>{
    const token=jwt.sign({userid},process.env.TOKEN_KEY,{expiresIn:"15d"});
    res.cookie("jwt",token,{
        maxAge:15*24*60*1000,
        httpOnly:true,
        sameSite:"None" ,
        secure:true ,
    })
}