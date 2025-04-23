import mongoose from "mongoose";
const inventoryschema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxLength:20
    },
    address:{
        type:String,
        required:true,
        maxLength:100
    },
    phone:{
        type:String,
        required:true,
        maxLength:13
    },
    status:{
        type:String,
        required:true,
    },
    date:{
        type:String,
        required:true,

    },
    closed_date:{
        type:String,

    },
    amount:{
        type:Number,
        required:true
    },
    debited_amount:[{type:Number}],
        balance:{
        type:Number,
        
    },
    branch:{
        type:String,
        required:true
    },
     voucher:{
            type:Number,
            unique:true,
            required:true
        },year:{
            type:String,
            required:true
        }
    
},{timestamps:true});
const inventory=mongoose.model("inventory",inventoryschema);
export default inventory;