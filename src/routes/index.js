const express = require('express');
const router = express.Router();
const isAuthenticated = require('../passport/local-auth')
const Afiliadx = require('../models/Afiliadx')

router.get('/', isAuthenticated, (req, res) => {
    var numeros = {}
    res.render('index',{numeros})
} )

router.get('/stats', isAuthenticated, async (req,res) => {
    var coso = await Afiliadx.distinct('dni',{confirmada: true});
    var total = coso.length

    var numeros = {
        total: total,
        minimo: Math.round(total * 0.1),
        votante : await Afiliadx.distinct('dni', {'estado.votante':true}).countDocuments(),
        contactadx : await Afiliadx.distinct('dni', {'estado.contactadx':true}).countDocuments(),
        voto : await Afiliadx.distinct('dni', {'estado.voto':true}).countDocuments()
    }
    numeros.faltan_confirmar = numeros.minimo - numeros.votante;
    numeros.faltan_votar = numeros.minimo - numeros.voto;
    numeros.por_voto = Math.round((numeros.voto * 100)) / numeros.minimo;
    numeros.por_votante = Math.round((numeros.votante * 100)) / numeros.minimo;
 
    res.render('index',{numeros})
})


module.exports = router;