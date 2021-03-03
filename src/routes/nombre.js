const express = require('express');
const router = express.Router();

const Afiliadx = require('../models/Afiliadx');
const isAuthenticated = require('../passport/local-auth');


router.get('/nombre', isAuthenticated, (req,res) => {
    var lista = false
    var _nombre = ''
    var _apellido = ''
    res.render('nombre',{
        lista,
        _nombre,
        _apellido
    });
});

router.post('/nombre', isAuthenticated, (req, res) => {
    const { nombre, apellido} = req.body;
    if (nombre === '') {
        res.redirect(`nombre/${apellido}/*`)
    } else { 
        res.redirect(`nombre/${apellido}/${nombre}`)
    }

})

router.get('/nombre/:_apellido/:_nombre', isAuthenticated, async (req, res) => {
    var { _nombre, _apellido } = req.params;

    var lista = await Afiliadx.find({
        nombre: {
            $regex: `${_nombre}`,
            $options: 'si'
        },
        apellido:{
            $regex: `${_apellido}`,
            $options: 'si'
        }
    }).sort({apellido: 'asc',nombre:'asc'})

    if (lista.length === 0) {
        var query = `(?=.*${_apellido})(?=.*${_nombre})`

        var lista = await Afiliadx.find({
            apellido:{
                $regex: query,
                $options: 'si'
            }
        }).sort({apellido: 'asc', nombre: 'asc'})
    }


    res.render('nombre',{
        lista,
        _nombre,
        _apellido
    })
})

module.exports = router