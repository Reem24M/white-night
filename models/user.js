import { Schema, model } from 'mongoose'
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
    fullname: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    phone: {
        type: String,
        trim: true,
        required: true,
    },
    // profile_pic: {
    //     url: { type: String, trim: true },
    //     publicId: { type: String, trim: true }
    // },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'owner'],
        default: 'user',
        required: true
    },

    otp: String,
    otpExpire: Date
}, { timestamps: true });

userSchema.methods.generateToken = function () {
    return jwt.sign(
        {
            id: this._id,
            role: this.role
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
}

export const Users = model('User', userSchema);