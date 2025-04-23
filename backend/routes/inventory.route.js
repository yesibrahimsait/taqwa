import express from 'express';
import {addinventory,updateinventory,getinventory,dataupdate,deletedata,getallpendinginv,Makepaid,
    closedAccounts,getpaid
} from '../controllers/inventory.controller.js'
import ProtectRoute2 from '../middleware/ProotectRoute2.js';
const route=express.Router();
route.post('/addinventory',ProtectRoute2,addinventory)
route.post('/updateinventory',ProtectRoute2,updateinventory)
route.get('/getinventory/:voucher',ProtectRoute2,getinventory)
route.put('/dataupdate/:voucher',ProtectRoute2,dataupdate)
route.delete('/deletedata/:voucher',ProtectRoute2,deletedata)
route.get("/pendingdetails",ProtectRoute2,getallpendinginv)
route.get('/closedAccounts',ProtectRoute2,closedAccounts)
route.put('/paymentpaid/:voucher',ProtectRoute2,Makepaid)
export default route;