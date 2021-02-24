const express = require('express');
const router = express.Router();
const passport = require('passport')

router.get('/', isAuthenticated, (req,res) => {
    res.render('index')
})

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }
    res.redirect('/login')
}

module.exports = router;