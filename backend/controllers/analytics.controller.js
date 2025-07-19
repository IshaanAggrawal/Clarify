const Todolist = require('../models/Todolist.model');


exports.getTodo = async (req, res) => {
    const todo = await Todolist.findOne({ createdBy: req.user._id });
    res.json(todo);
};


exports.addTask = async (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ message: "Title required" });

    const todo = await Todolist.findOne({ createdBy: req.user._id });
    todo.tasks.push({ title });
    todo.updatedAt = Date.now();
    await todo.save();

    res.status(201).json({ success: true, tasks: todo.tasks });
};

exports.updateTask = async (req, res) => {
    const { title } = req.body;
    const index = req.params.index;

    const todo = await Todolist.findOne({ createdBy: req.user._id });
    if (!todo || !todo.tasks[index]) return res.status(404).json({ message: "Task not found" });

    todo.tasks[index].title = title;
    todo.updatedAt = Date.now();
    await todo.save();

    res.json({ success: true, tasks: todo.tasks });
};

exports.toggleTaskCompletion = async (req, res) => {
    const index = req.params.index;

    const todo = await Todolist.findOne({ createdBy: req.user._id });
    if (!todo || !todo.tasks[index]) return res.status(404).json({ message: "Task not found" });

    todo.tasks[index].completed = !todo.tasks[index].completed;
    todo.updatedAt = Date.now();
    await todo.save();

    res.json({ success: true, tasks: todo.tasks });
};

exports.deleteTask = async (req, res) => {
    const index = req.params.index;

    const todo = await Todolist.findOne({ createdBy: req.user._id });
    if (!todo || !todo.tasks[index]) return res.status(404).json({ message: "Task not found" });

    todo.tasks.splice(index, 1);
    todo.updatedAt = Date.now();
    await todo.save();

    res.json({ success: true, tasks: todo.tasks });
};
