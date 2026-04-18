import {Router} from "express"
const router=Router();

import { login } from "../controller/login.controller.js";
import { register } from "../controller/register.controller.js";
import { forgotPassword, resetPassword } from "../controller/forgetPassword.js";


router.post('/login', login);
router.post('/register', register);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);



export default router;