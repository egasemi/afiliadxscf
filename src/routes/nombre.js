const express = require('express');
const router = express.Router();

const Afiliadx = require('../models/Afiliadx');

function numRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

router.get('/nombre', (req,res) => {

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

router.get('/nombre/:_nombre/:_apellido/:_suma', async (req, res) => {
    const { _nombre, _apellido, _suma } = req.params;
    afiliadx = {
        texto: '',
        color: '',
        display: 'visible'
    }
    if (resultado === parseInt(_suma)) {
        var consulta = await Afiliadx.find({
            nombre: {
                $regex: `^${_nombre}`,
                $options: 'i'
            },
            apellido:{
                $regex: `^${_apellido}`,
                $options: 'i'
            }
        })
        if (consulta.length < 1) {
            afiliadx = {
                texto: 'No hay afiliadxs con ese nombre',
                color: 'warning',
                display: 'visible'
            }
        } else {
    
            afiliadx.display = 'invisible';
            consulta.display = 'visible';
        }
    } else {
        consulta = {display:'invisible'};
        afiliadx = {
            texto :'Sacaste mal la cuenta',
            color :'danger',
            display :'visible'
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