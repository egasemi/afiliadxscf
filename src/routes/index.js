const express = require('express');
const router = express.Router();
const isAuthenticated = require('../passport/local-auth')
const Afiliadx = require('../models/Afiliadx')

router.get('/', async (req,res) => {    
    res.render('index')
})


module.exports = router;