import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { corscontroll } from './config/coraccess.js';
import { connectdb } from './DB/connectdb.js';
import authroute from './routes/auth.route.js'
import inventoryroute from './routes/inventory.route.js'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser';
const app=express();
dotenv.config();
const PORT=process.env.PORT || 3200
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin:"*",
    methods:['GET','POST','DELETE','PUT','PATCH'],
    credentials:true
}));
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/api/auth',authroute)
app.use('/api/inventory',inventoryroute)
app.listen(PORT,()=>console.log("The app is running on port: "+PORT))
connectdb();