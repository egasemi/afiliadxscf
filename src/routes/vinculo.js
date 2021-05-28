const express = require('express');
const router  = express.Router();
const isAuthenticated = require('../passport/local-auth');
const Persona = require('../models/Persona');
const {desplegable, vinculo} = require('../helpers/helpers');



router.get('/vinculo', isAuthenticated, async (req, res) => {
    var lugares = await desplegable();
    var vinculos = await vinculo();
    vinculos.push('voto','votante')
    vinculos.splice(0,1)
    var lista = false
    var count = 0
    var _vinculo = ''
    res.render('vinculo', {
        vinculos,
        lugares,
        lista,
        _vinculo,
        count
    })
})

router.get('/vinculo/:_vinculo/:_page', isAuthenticated, async (req, res) => {
    var vinculos = await vinculo();
    vinculos.push('voto','votante')
    vinculos.splice(0,1)
    var { _vinculo, _page } = req.params;
    var query = {}
    if (_vinculo === 'voto' || _vinculo === 'votante') {
        query['vinculos.afiliada.estado.'+_vinculo] = true
    } else {
        query['vinculos.'+_vinculo] = {
            '$exists': true
        }
    }
    var lista = await Persona.paginate(query,{page:_page, limit: 20})
    var count  = lista.length
    res.render('vinculo',{
        lista,
        vinculos,
        count,
        _vinculo
    })
})

module.exports = router