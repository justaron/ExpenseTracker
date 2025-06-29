const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    }, { timestamps: true });

    module.exports = mongoose.model('User',userSchema);

    const User = require('../models/User');
    const bcrypt = require('bcryptjs');
    const jwt = require('jsonwebtoken');

    exports.register = async (req, res) => {
        try{
        const {username,email,password} = req.body;
        const existingUser = await User.findOne({email});
            if (existingUser){
                return res.status(400).json({message: 'Email Already In Use'});
            }
        const existingUsername = await User.findOne({username});
            if (existingUsername){
                return res.status(400).json({message: 'Username Already In Use'});
            }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password:hashedPassword
        });
        await newUser.save();
        res.status(201).json({message : 'User Registered Succesfully'});
    } catch(error){
        console.error(error);
        res.status(500).json({message:'Server Error'});
    
    }
};