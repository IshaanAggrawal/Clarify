const bcrypt = require("bcryptjs");
const User = require("../models/User.model");
const generateToken = require("../utils/utils");
const cloudinary=require('../utils/cloudinary')
const Todolist = require("../models/Todolist.model");

const register = async (req, res) => {
    try {
        const { fullname, email, password, degree, year,institute } = req.body;
        console.log("Received data:", req.body);

        if (!fullname || !email || !password) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email Already Exist", success: false });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Password hashed");

        const newUser = await User.create({
            fullname,
            email,
            password: hashedPassword,
            degree,
            year,
            institute,
        });

        console.log("New user created:", newUser);

        await Todolist.create({
            createdBy: newUser._id,
            tasks: [],
        });

        if (newUser) {
            generateToken(newUser._id, res);
            return res.status(201).json({
            message: "Registration successful",
            user: {
                _id: newUser._id,
                fullname: newUser.fullname,
                email: newUser.email,
                profilePic: newUser.profilePic,
                institute: newUser.institute,
                degree: newUser.degree,
                year: newUser.year,
                description: newUser.description,
                createdAt: newUser.createdAt,
            },
                success: true
            });

        } else {
            return res.status(400).json({ message: "Invalid User Data", success: false });
        }
    } catch (error) {
        console.error("REGISTER ERROR:", error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found", success: false });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials", success: false });
        }
        generateToken(user._id,res);
        return res.status(200).json({
            message: "Login successful",
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            profilePic: user.profilePic,
            institute: user.institute,
            degree: user.degree,
            year: user.year,
            description: user.description,
            createdAt: user.createdAt,
            success: true
        });
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

    const updateProfile = async (req, res) => {
    try {
        const { fullname, profilePic, description ,degree,year,institute } = req.body;
        const userId = req.user._id;

        const updateFields = {};

        if (profilePic) {
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        updateFields.profilePic = uploadResponse.secure_url;
        }

        if (fullname !== undefined) {
        updateFields.fullname = fullname;
        }
        if (degree!==undefined){
        updateFields.degree=degree
        }
        if (year!==undefined){
        updateFields.year=year
        }
        if (description !== undefined) {
        updateFields.description = description;
        }
        if (institute !== undefined) {
        updateFields.institute = institute;
        }
        const updatedUser = await User.findByIdAndUpdate(userId, updateFields, {
        new: true,
        runValidators: true,
        });

        if (!updatedUser) {
        return res.status(404).json({ message: "User not found", success: false });
        }

        res.status(200).json({
        message: "Profile updated successfully",
        user: {
            _id: updatedUser._id,
            fullname: updatedUser.fullname,
            email: updatedUser.email,
            profilePic: updatedUser.profilePic,
            institute: updatedUser.institute,
            degree:updatedUser.degree,
            year:updatedUser.year,
            description: updatedUser.description,
            createdAt: updatedUser.createdAt,
        },
        success: true,
        });
    } catch (error) {
        console.log("Error in update profile:", error);
        res.status(500).json({ message: "Internal server error", success: false });
    }
    };


const checkAuth = (req, res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { register, login, logout, updateProfile, checkAuth };