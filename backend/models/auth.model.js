import mongoose from 'mongoose';
const AuthorizationSchema=new mongoose.Schema({username:{type:String,
    required:true,
    unique:true
},
fullname:{type:String,
    required:true,

},password:{
    type:String,
    required:true,
    minLength:6
},role:{type:String}},{timestamps:true});
const Auth=mongoose.model("auths",AuthorizationSchema);
export default Auth;