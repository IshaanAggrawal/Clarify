    const mongoose = require('mongoose');

    const resourceSchema = new mongoose.Schema(
    {
        title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200,
        },

        uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: function () {
            return !this.isAnonymous;
        },
        },

        isAnonymous: {
        type: Boolean,
        default: false,
        },

        contentHash: {
        type: String,
        required: true,
        trim: true,
        },

        room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Room',
        },
    },
    {
        timestamps: true,
    }
    );

    module.exports = mongoose.model('Resource', resourceSchema);
