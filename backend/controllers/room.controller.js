    const Room = require("../models/Createroom.model");
    const bcrypt = require("bcryptjs");
    const Resource = require("../models/Resources.model");

    exports.createRoom = async (req, res) => {
    try {
        const { roomId, description, password } = req.body;
        const createdBy = req.user?._id;

        if (!roomId || typeof roomId !== "string" || roomId.length < 3 || roomId.length > 100) {
        return res.status(400).json({ success: false, message: "Room name must be between 3 to 100 characters." });
        }

        const existingRoom = await Room.findOne({ roomId });
        if (existingRoom) {
        return res.status(400).json({ success: false, message: "Room name already exists. Choose another." });
        }

        const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

        const newRoom = new Room({
        roomId,
        description,
        password: hashedPassword,
        createdBy,
        participants: [createdBy],
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

        const room = await Room.findOne({ roomId });
        if (!room) return res.status(404).json({ success: false, message: "Room not found." });

        if (room.password) {
        if (!password) return res.status(400).json({ success: false, message: "Password is required." });

        const isMatch = await bcrypt.compare(password, room.password);
        if (!isMatch) return res.status(401).json({ success: false, message: "Incorrect password." });
        }

        if (room.participants.includes(userId)) {
        return res.status(200).json({ success: true, message: "Already joined.", room });
        }

        room.participants.push(userId);
        await room.save();

        return res.status(200).json({ success: true, message: "Joined successfully.", room });
    } catch (error) {
        console.error("Error joining room:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
    };

    exports.exitRoom = async (req, res) => {
    try {
        const { roomId } = req.body;
        const userId = req.user?._id;

        const room = await Room.findOne({ roomId });
        if (!room) return res.status(404).json({ success: false, message: "Room not found." });

        room.participants = room.participants.filter(id => id.toString() !== userId.toString());

        if (room.createdBy.toString() === userId.toString()) {
        if (room.participants.length > 0) {
            room.createdBy = room.participants[0];
        } else {
            await Room.deleteOne({ _id: room._id });
            return res.status(200).json({ success: true, message: "Room deleted as no members remained." });
        }
        }

        await room.save();

        return res.status(200).json({ success: true, message: "Left the room successfully." });
    } catch (error) {
        console.error("Error leaving room:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
    };

    exports.uploadResource = async (req, res) => {
    try {
        const { roomId, title, description, content, isAnonymous, blockchainProof } = req.body;
        const userId = req.user?._id;

        if (!roomId || !title || !content) {
        return res.status(400).json({ success: false, message: "Room ID, title, and content are required." });
        }

        const room = await Room.findOne({ roomId });
        if (!room) {
        return res.status(404).json({ success: false, message: "Room not found." });
        }

        const newResource = new Resource({
        roomId,
        title,
        description,
        content,
        uploadedBy: isAnonymous ? null : userId,
        isAnonymous: !!isAnonymous,
        blockchainProof: isAnonymous ? blockchainProof : null,
        });

        const saved = await newResource.save();

        return res.status(201).json({
        success: true,
        message: "Resource shared successfully.",
        resource: saved,
        });
    } catch (err) {
        console.error("Upload error:", err);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
    };

    exports.getResourcesByRoom = async (req, res) => {
    try {
        const { roomId } = req.params;

        const resources = await Resource.find({ roomId }).sort({ createdAt: -1 }).populate("uploadedBy", "username");

        return res.status(200).json({
        success: true,
        resources,
        });
    } catch (error) {
        console.error("Error fetching resources:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
    };
