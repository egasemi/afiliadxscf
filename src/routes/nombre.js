const express = require('express');
const router = express.Router();

const Afiliadx = require('../models/Afiliadx');
const isAuthenticated = require('../passport/local-auth');


router.get('/nombre', isAuthenticated, (req,res) => {

    afiliadx = {
        texto: '',
        display: 'invisible',
        color: ''
    }
    consulta = {display : 'invisible'}
    res.render('nombre',{
        consulta,
        afiliadx
    });
});

router.post('/nombre', isAuthenticated, (req, res) => {
    const { nombre, apellido} = req.body;
    if (nombre === '') {
        res.redirect(`nombre/${apellido}/*`)
    }
    res.redirect(`nombre/${apellido}/${nombre}`)

})

router.get('/nombre/:_apellido/:_nombre', isAuthenticated, async (req, res) => {
    const { _nombre, _apellido } = req.params;
    afiliadx = {
        texto: '',
        color: '',
        display: 'visible'
    }

    var consulta = await Afiliadx.find({
        nombre: {
            $regex: `${_nombre}`,
            $options: 'si'
        },
        apellido:{
            $regex: `${_apellido}`,
            $options: 'si'
        }
    })
    if (consulta.length > 0) {

        consulta.display = 'visible';
        afiliadx.display = 'invisible'

    } else {

        var consulta = await Afiliadx.find({
            apellido:{
                $regex: `${_apellido}`,
                $options: 'si'
            }
        })

        if (consulta.length > 0) {

            consulta.display = 'visible';
            afiliadx.display = 'invisible';
        } else {
            consulta.display = 'invisible';
            afiliadx = {
                display: 'visible',
                texto: 'No hay afiliadxs con ese nombre',
                color: 'warning'
            }
        }
    }


    res.render('nombre',{
        consulta,
        afiliadx
    })
})

module.exports = router