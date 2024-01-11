import express from 'express';

import { verifyToken } from '../utils/verifyUser.js';
import {  test, updateUser,deleteUser,getUserListings} from '../controller/userController.js';
const router = express.Router();

router.get('/test', test)
router.post('/update/:id',  updateUser)
router.delete('/delete/:id',  deleteUser)
router.get('/listings/:id', getUserListings)
export default router;