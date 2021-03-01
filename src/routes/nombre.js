const express = require('express');
const router = express.Router();

const Afiliadx = require('../models/Afiliadx');
const isAuthenticated = require('../passport/local-auth');

function numRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

router.get('/nombre', isAuthenticated, (req,res) => {

    sum1 = numRandom(1,11)
    sum2 = numRandom(1,11)
    resultado = sum1 + sum2
    afiliadx = {
        texto: '',
        display: 'invisible',
        color: ''
    }
    consulta = {display : 'invisible'}
    res.render('nombre',{
        consulta,
        resultado,
        afiliadx,
        sum1,
        sum2
    });
});

router.post('/nombre', isAuthenticated, (req, res) => {
    const { nombre, apellido, suma} = req.body;
    if (nombre === '') {
        res.redirect(`nombre/${suma}/${apellido}/*`)
    }
    res.redirect(`nombre/${suma}/${apellido}/${nombre}`)

})

router.get('/nombre/:_suma/:_apellido/:_nombre', isAuthenticated, async (req, res) => {
    const { _nombre, _apellido, _suma } = req.params;
    afiliadx = {
        texto: '',
        color: '',
        display: 'visible'
    }
    if (!(resultado === parseInt(_suma))) {
        consulta = {display:'invisible'};
        afiliadx = {
            texto :'Sacaste mal la cuenta',
            color :'danger',
            display :'visible'
        }
    } else {
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
    }

    sum1 = numRandom(1,11)
    sum2 = numRandom(1,11)
    resultado = sum1 + sum2

    res.render('nombre',{
        consulta,
        resultado,
        afiliadx
    })
})

module.exports = router