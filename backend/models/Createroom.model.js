    const mongoose = require('mongoose');

    const roomSchema = new mongoose.Schema(
    {
        roomId: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 100,
        },
        description: {
        type: String,
        trim: true,
        maxlength: 500,
        default: '',
        },
        password: {
        type: String,
        trim: true,
        minlength: 4,
        maxlength: 100,
        },
        createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        },
    },
    {
        timestamps: true,
    }
    );

    module.exports=mongoose.model('Room', roomSchema);
