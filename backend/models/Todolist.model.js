const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, default: false }
}, { _id: false });

const TodolistSchema = new Schema({
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', unique: true },
    tasks: [TaskSchema],
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Todolist', TodolistSchema);
