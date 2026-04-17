import {Router} from "express"
const router=Router();

import { login } from "../controller/login.controller.js";
import { register } from "../controller/register.controller.js";


router.post('/login', login);
router.post('/register', register);



export default router;