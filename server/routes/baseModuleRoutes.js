import express from 'express';


import {
  Login
} from '../controllers/baseModule/Users.js';




const baseModuleRouter = express.Router();

baseModuleRouter.post('/login', Login);


export default baseModuleRouter;
