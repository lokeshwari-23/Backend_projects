const express = require('express');
const router = express.Router();
const controller = require('../controllers/controller')
require("dotenv").config()
router.get('/users',controller.users);
router.get('/comments',controller.comments);
router.get('/refresh/:db',controller.refresh);

module.exports =router;