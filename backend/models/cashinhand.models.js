import mongoose from 'mongoose';
const cashinhandschema=new mongoose.Schema({
    Initial_amount:{
        type:Number,
    },
    cash_out:{
        type:Number
    },
    cash_in:{
        type:Number
    }
},{timestamps:true});
const cashin=mongoose.model("cashin",cashinhandschema);
export default cashin;