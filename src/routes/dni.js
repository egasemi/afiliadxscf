const express = require('express');
const router = express.Router();
const Afiliadx = require('../models/Afiliadx');
const isAuthenticated = require('../passport/local-auth');


router.get('/dni', isAuthenticated,(req,res) => {

    afiliadx = {
        texto: '',
        display: 'invisible',
        color: '',
        votante: false
    }
    res.render('dni',{afiliadx});
});

router.post('/dni', isAuthenticated, (req,res)=> {
    const dni = req.body.dni;

    res.redirect(`/dni/${dni}`);
})

router.get('/dni/:_dni', isAuthenticated, async (req,res) => {

    const _dni = req.params._dni;
    afiliadx = {
        texto : '',
        display: 'visible',
        color: ''
    }

    const consulta = await Afiliadx.findOne({dni: _dni});

    if (consulta) {
        afiliadx._id = consulta._id
        if (consulta.confirmada === true) {
            afiliadx.texto = `${consulta.nombre} ${consulta.apellido} DNI: ${consulta.dni} está afiliadx! :)`;            
            afiliadx.color = 'success';
            afiliadx.conf = consulta.estado.votante
        } else {
            afiliadx.texto = `La afiliación de ${consulta.nombre} ${consulta.apellido} DNI: ${consulta.dni} fue enviada pero rebotó o se cayó :/`;
            afiliadx.color = 'warning';
        }
    } else {
        afiliadx.texto = 'No hay afiliadxs con ese DNI';
        afiliadx.color = 'warning'
    }

    res.render('dni',{afiliadx});
});

module.exports = router;