const express = require('express');
const isAuthenticated = require('../middlewares/isAuthenticated');
const { createRoom, joinRoom } = require('../controllers/room.controller');
const router = express.Router();
router.post('/create', isAuthenticated, createRoom);
router.post('/join', isAuthenticated, joinRoom);
module.exports = router;