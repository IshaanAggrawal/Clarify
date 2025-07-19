const express = require('express');
const router = express.Router();
const {
    getTodo,
    addTask,
    updateTask,
    toggleTaskCompletion,
    deleteTask
} = require('../controllers/analytics.controller.js');
const isAuthenticated = require('../middlewares/isAuthenticated.js');

router.get('/todolist', isAuthenticated, getTodo);
router.post('/tasks', isAuthenticated, addTask);
router.put('/tasks/:index', isAuthenticated, updateTask);
router.patch('/tasks/:index', isAuthenticated, toggleTaskCompletion);
router.delete('/tasks/:index', isAuthenticated, deleteTask);

module.exports = router;
