    import mongoose from 'mongoose';

    const roomSchema = new mongoose.Schema(
    {
        roomName: {
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

    export default mongoose.model('Room', roomSchema);
