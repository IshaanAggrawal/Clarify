    const Room = require("../models/Createroom.model");
    const bcrypt = require("bcryptjs");

    exports.createRoom = async (req, res) => {
    try {
        const { roomId, description, password } = req.body;
        const createdBy = req.user?._id; // Add fallback if user not attached

        // Validate roomId
        if (!roomId || typeof roomId !== "string" || roomId.length < 3 || roomId.length > 100) {
        return res.status(400).json({ success: false, message: "Room name must be between 3 to 100 characters." });
        }

        const existingRoom = await Room.findOne({ roomId });
        if (existingRoom) {
        return res.status(400).json({ success: false, message: "Room name already exists. Choose another." });
        }

        if (description && description.length > 500) {
        return res.status(400).json({ success: false, message: "Description too long. Max 500 characters." });
        }

        let hashedPassword = null;
        if (password) {
        hashedPassword = await bcrypt.hash(password, 10);
        }

        const newRoom = new Room({
        roomId,
        description,
        password: hashedPassword,
        createdBy,
        });

        const savedRoom = await newRoom.save();

        return res.status(201).json({
        success: true,
        message: "Room created successfully.",
        room: savedRoom,
        });
    } catch (error) {
        console.error("Error creating room:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
    };

    exports.joinRoom = async (req, res) => {
    try {
        const { roomId, password } = req.body;
        const userId = req.user?._id;

        if (!roomId || typeof roomId !== "string") {
        return res.status(400).json({ success: false, message: "Room ID is required." });
        }

        const room = await Room.findOne({ roomId });
        if (!room) {
        return res.status(404).json({ success: false, message: "Room not found." });
        }

        if (room.password) {
        if (!password) {
            return res.status(400).json({ success: false, message: "Password is required for this room." });
        }
        const isMatch = await bcrypt.compare(password, room.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Incorrect password." });
        }
        }

        // Optional: add user to room.participants

        return res.status(200).json({
        success: true,
        message: "Successfully joined the room.",
        room,
        });
    } catch (error) {
        console.error("Error joining room:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
    };
