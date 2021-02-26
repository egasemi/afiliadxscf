const express = require('express');
const router = express.Router();
const Afiliadx = require('../models/Afiliadx');
const isAuthenticated = require('../passport/local-auth');

async function desplegable() {
    var array = await Afiliadx.distinct('distrito')
    return lugares = array.sort();   
}

router.get('/afiliadx/:id', isAuthenticated, async (req, res) => {
    var afiliadx = await Afiliadx.findById(req.params.id);
    var fecha = new Date()
    if (afiliadx.clase.length > 3) {
        afiliadx.edad = fecha.getFullYear() - parseInt(afiliadx.clase)
    } else {
        afiliadx.edad = '-'
    }
    res.render('afiliadx',{afiliadx})
})

router.get('/afiliadx/estado/:tipo/:id', isAuthenticated, async (req, res) => {
    const {tipo, id} = req.params
    var afiliadx = await Afiliadx.findById(id);
    afiliadx.estado[tipo] = !afiliadx.estado[tipo];
    afiliadx.save()
    res.redirect('/afiliadx/'+ id)
})

router.get('/afiliadx/borrar/:id', isAuthenticated, async (req, res) => {
    var afiliadx = await Afiliadx.findById(req.params.id)
    afiliadx.visible = !afiliadx.visible
    //afiliadx.save();
    res.redirect('/')
})

router.get('/afiliadx/editar/:id', isAuthenticated,async (req, res) => {
    await desplegable()
    var afiliadx = await Afiliadx.findById(req.params.id);
    afiliadx.fecha_nac = afiliadx.nacimiento.toJSON().split('T',1)[0]
    res.render('afiliadx_edit',{afiliadx, lugares})
})

router.post('/afiliadx/editar/:id', isAuthenticated, async (req, res) => {
    var afiliadx = await Afiliadx.findByIdAndUpdate(req.params.id, req.body)
    afiliadx.save()
    res.redirect('/afiliadx/' + req.params.id)
})

module.exports = router