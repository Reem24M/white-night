import { Schema, model } from 'mongoose';
import jwt from 'jsonwebtoken';
import { emailField, invalidEmailMsg, phoneNumberField, invalidPhoneMsg } from '../Utils/Schema-patterns.js';

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
        match: [emailField, invalidEmailMsg]
    },
    phone: {
        type: String,
        trim: true,
        required: true,
        match: [phoneNumberField, invalidPhoneMsg]
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
        enum: ['user', 'admin', 'Owner'],
        default: 'user',
        required: true
    },
    // address: {
    //     governorate: {
    //         type: String,
    //         trim: true
    //     },
    //     city: {
    //         type: String,
    //         trim: true
    //     },
    //     street: {
    //         type: String,
    //         trim: true,
    //     },
    //     details: {
    //         type: String,
    //         trim: true,
    //         default: ""
    //     }
    // },
    ownerStatus: {
        type: String,
        enum: ['none', 'pending', 'approved', 'rejected'],
        default: 'none'
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
        { expiresIn: '5h' }
    );
}

export const Users = model('User', userSchema);