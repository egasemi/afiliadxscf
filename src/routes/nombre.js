const express = require('express');
const router = express.Router();

const Persona = require('../models/Persona');
const isAuthenticated = require('../passport/local-auth');
const {vinculo} = require('../helpers/helpers');


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
        res.redirect(`nombre/${apellido}/*/1`)
    } else { 
        res.redirect(`nombre/${apellido}/${nombre}/1`)
    }

})

router.get('/nombre/:_apellido/:_nombre/:_page', isAuthenticated, async (req, res) => {
    var vinculos = await vinculo()
    vinculos.push('voto','votante')
    vinculos.splice(0,1)
    var { _nombre, _apellido, _page } = req.params;

    var lista = await Persona.paginate({
        nombre: {
            $regex: `${_nombre}`,
            $options: 'si'
        },
        apellido:{
            $regex: `${_apellido}`,
            $options: 'si'
        }
    },
    {
        page : _page, limit: 20
    })

    if (lista.length === 0) {
        var query = `(?=.*${_apellido})(?=.*${_nombre})`

        var lista = await Persona.paginate({
            apellido:{
                $regex: query,
                $options: 'si'
            }
        },{
            page : _page, limit: 20
        })
    }

    res.render('nombre',{
        lista,
        vinculos,
        _nombre,
        _apellido
    })
})

module.exports = router