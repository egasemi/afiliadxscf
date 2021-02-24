const express = require('express');
const router = express.Router();
const passport = require('passport')
const isAdmin = require('../passport/local-auth')


router.get('/singin', isAdmin, (req, res) => {
    var passError = ''
    res.render('singin', {
        passError
    })
})

router.post('/singin',passport.authenticate('local-signin', {
    successRedirect: '/login',
    failureRedirect: '/singin'
}))



module.exports = router