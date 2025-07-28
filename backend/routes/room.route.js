const express = require('express');
const router = express.Router();
const isAuthenticated = require('../middlewares/isAuthenticated');
const {createRoom,joinRoom,exitRoom,uploadResource,getResourcesByRoom} = require('../controllers/room.controller');

router.post('/create', isAuthenticated, createRoom);
router.post('/join', isAuthenticated, joinRoom);
router.post('/exit', isAuthenticated, exitRoom);

router.post('/upload-resource', isAuthenticated, uploadResource);
router.get('/resources/:roomId', isAuthenticated, getResourcesByRoom);

module.exports = router;