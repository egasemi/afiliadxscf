const express = require('express');
const {vinculo} = require('../helpers/helpers');
const router = express.Router();
const Persona = require('../models/Persona');
const isAuthenticated = require('../passport/local-auth');


router.get('/dni', isAuthenticated,(req,res) => {
    var lista = false
    var _dni = ''
    res.render('dni',{lista, _dni});
});

router.post('/dni', isAuthenticated, (req,res)=> {
    const dni = req.body.dni;

    res.redirect(`/dni/${dni}/1`);
})

router.get('/dni/:_dni/:_page', isAuthenticated, async (req,res) => {
    var vinculos = await vinculo()
    vinculos.push('voto','votante')
    vinculos.splice(0,1)
    const {_dni, _page} = req.params;
    var lista = await Persona.paginate({dni: _dni},{page: _page, limit: 20})

    res.render('dni',{lista, _dni, vinculos});
});

module.exports = router;