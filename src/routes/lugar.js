const express = require('express');
const router  = express.Router();
const isAuthenticated = require('../passport/local-auth');
const Persona = require('../models/Persona');
const {desplegable, vinculo} = require('../helpers/helpers');



router.get('/lugar', isAuthenticated, async (req, res) => {
    var lugares = await desplegable();
    var vinculos = await vinculo();
    vinculos.push('voto','votante')
    vinculos.splice(0,1)
    var lista = false
    var count = 0
    var _lugar = ''
    res.render('lugar', {
        vinculos,
        lugares,
        lista,
        _lugar,
        count
    })
})

router.get('/lugar/:_lugar/:_page', isAuthenticated, async (req, res) => {
    var vinculos = await vinculo();
    vinculos.push('voto','votante')
    vinculos.splice(0,1)
    var { _lugar, _page } = req.params;
    var lista = await Persona.paginate({'vinculos.difusion.lugar': _lugar},{page:_page, limit: 20})
    var count  = lista.length
    res.render('lugar',{
        lista,
        vinculos,
        count,
        _lugar
    })
})

module.exports = router