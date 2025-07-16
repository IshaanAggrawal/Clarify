const Room = require("../models/Createroom.model");
const bcrypt= require("bcryptjs");
const cloudinary=require('../utils/cloudinary')

exports.createRoom = async (req, res) => {
    try {
        const { roomName, description, password } = req.body;
        const createdBy = req.user._id;

        if (!roomName || roomName.length < 3 || roomName.length > 100) {
            return res.status(400).json({ message: "Invalid room name." });
        }
        const existingUser = await Room.findOne({ roomName });
        if (existingUser) {
            return res.status(400).json({ message: "Room name should be unique", success: false });
        }

        if (description && description.length > 500) {
            return res.status(400).json({ message: "Description is too long." });
        }


        let hashedPassword = null;
        if (password) {
            hashedPassword = await bcrypt.hash(password, 10);
        }

        const newRoom = new Room({
            roomName,
            description,
            password: hashedPassword,
            createdBy,
        });

        const savedRoom = await newRoom.save();
        res.status(201).json(savedRoom);
    } catch (error) {
        console.error("Error creating room:", error);
        res.status(500).json({ message: "Server error." });
    }
}

