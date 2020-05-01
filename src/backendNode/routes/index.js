const router = require('express').Router();
const authRoutes = require('./auth/auth.routes');
const express = require('express');
const app = express();
const DB = require('../config/db');

//init DB
DB();

router.get('/', (req, res) => {
    res.send('Hello from Home');
});

module.exports = router;