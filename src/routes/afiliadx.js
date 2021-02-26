const express = require('express');
const router = express.Router();
const Afiliadx = require('../models/Afiliadx');
const isAuthenticated = require('../passport/local-auth');

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
    console.log(afiliadx.visible)
    afiliadx.visible = !afiliadx.visible
    //afiliadx.save();
    console.log(afiliadx.visible)
    res.redirect('/')
})

router.get('/afiliadx/editar/:id', isAuthenticated,async (req, res) => {
    var afiliadx = await Afiliadx.findById(req.params.id);
    afiliadx.fecha_nac = afiliadx.nacimiento.toJSON().split('T',1)[0]
    res.render('afiliadx_edit',{afiliadx})
})

router.post('/afiliadx/editar/:id', isAuthenticated, async (req, res) => {
    var afiliadx = await Afiliadx.findByIdAndUpdate(req.params.id, req.body)
    afiliadx.save()
    res.redirect('/afiliadx/' + req.params.id)
})

module.exports = router