const express = require('express');
const router  = express.Router();
const isAuthenticated = require('../passport/local-auth');
const Afiliadx = require('../models/Afiliadx');

async function desplegable() {
    var array = await Afiliadx.distinct('distrito')
    return lugares = array.sort();   
}



router.get('/lista', isAuthenticated, async (req, res) => {
    await desplegable();
    var lista = false
    var count = 0
    var _distrito = ''
    res.render('lista', {
        lugares,
        lista,
        _distrito,
        count
    })
})

router.get('/lista/:_distrito', isAuthenticated, async (req, res) => {
    await desplegable()
    var { _distrito } = req.params;
    var lista = await Afiliadx.find({distrito: _distrito})
    var count  = lista.length
    res.render('lista',{
        lista,
        count,
        _distrito
    })
})

module.exports = router