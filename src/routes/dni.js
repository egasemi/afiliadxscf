const express = require('express');
const router = express.Router();
const Afiliadx = require('../models/Afiliadx');
const isAuthenticated = require('../passport/local-auth');


router.get('/dni', isAuthenticated,(req,res) => {
    var lista = false
    var _dni = ''
    res.render('dni',{lista, _dni});
});

router.post('/dni', isAuthenticated, (req,res)=> {
    const dni = req.body.dni;

    res.redirect(`/dni/${dni}`);
})

router.get('/dni/:_dni', isAuthenticated, async (req,res) => {

    const _dni = req.params._dni;
    var lista = await Afiliadx.find({dni: _dni})

    res.render('dni',{lista, _dni});
});

module.exports = router;