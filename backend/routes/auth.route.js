import express from 'express';
import { signup, login,logout,CreateAdmin,getrole,getrole2,demotoken} from '../controllers/auth.controller.js';
import ProtectRoute from '../middleware/ProtectRoute.js';
import ProtectRoute2 from '../middleware/ProotectRoute2.js';
const route=express.Router();
route.post('/signup',signup);
route.post('/login',login);
route.post('/logout',logout);
// route.post('/createadmin',ProtectRoute,CreateAdmin)
route.post('/admin',ProtectRoute,CreateAdmin)
route.post('/getrole',getrole)
route.post('/getrole2',ProtectRoute,getrole2)
route.post('/gettoken',ProtectRoute2,demotoken)
export default route;