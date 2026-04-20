import { hash } from "bcrypt";
import { Users } from '../models/user.js';
import { registerSchema } from "../validators/register_schema.js";
import asyncHandler from "express-async-handler";

const register = asyncHandler(async (req, res) => {
    const { error } = registerSchema.validate(req.body);

    if (error) return res.status(400).json({ error: error.details[0].message });

        const { fullname, email, phone, password, role } = req.body;


    const existingUser = await Users.findOne({ email });
    if (existingUser)
        return res.status(400).json({ error: "User already exists" });

    if(role && role !== 'user' && role !== 'Owner') {
        return res.status(400).json({ error: "Invalid role specified" });
    }
    const hashedPassword = await hash(password, 10);

    const newUser = new Users({
        fullname,
        email,
        phone,
        password: hashedPassword,
        role: 'user',
        ownerStatus: role === 'Owner' ? 'pending' : 'none'
    });

    await newUser.save();
    const token = newUser.generateToken();

    const { password: _password, ...userWithoutPassword } = newUser.toObject();

    res.status(201).json({
        Token: token,
        user: {...userWithoutPassword, role: newUser.role },
    });
});

export { register };
