const express = require('express');
const router = express.Router();
const Afiliadx = require('../models/Afiliadx');
const isAuthenticated = require('../passport/local-auth');

function numRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

router.get('/dni', isAuthenticated,(req,res) => {

    sum1 = numRandom(1,11)
    sum2 = numRandom(1,11)
    resultado = sum1 + sum2
    afiliadx = {
        texto: '',
        display: 'invisible',
        color: ''
    }
    res.render('dni',{
        resultado,
        afiliadx,
        sum1,
        sum2
    });
});

router.post('/dni', isAuthenticated, (req,res)=> {
    const {dni, suma} = req.body;

    res.redirect(`/dni/${dni}/${suma}`);
})

router.get('/dni/:_dni/:_suma', isAuthenticated, async (req,res) => {

    const { _dni, _suma } = req.params;
    afiliadx = {
        texto : '',
        display: 'visible',
        color: ''
    }

    if (resultado === parseInt(_suma)) {
        const consulta = await Afiliadx.findOne({dni: _dni});
        console.log(consulta)
        if (consulta) {
            afiliadx._id = consulta._id
            if (consulta.confirmada === true) {
                afiliadx.texto = `${consulta.nombre} ${consulta.apellido} DNI: ${consulta.dni} está afiliadx! :)`;            
                afiliadx.color = 'success'
            } else {
                afiliadx.texto = `La afiliación de ${consulta.nombre} ${consulta.apellido} DNI: ${consulta.dni} fue enviada pero rebotó o se cayó :/`;
                afiliadx.color = 'warning'
            }
        } else {
            afiliadx.texto = 'No hay afiliadxs con ese DNI';
            afiliadx.color = 'warning'
        }
    } else {
        afiliadx.texto = 'Sacaste mal la cuenta';
        afiliadx.color = 'danger'
    }
    var sum1 = numRandom(1,11)
    var sum2 = numRandom(1,11)
    resultado = sum1 + sum2
    res.render('dni',{
        afiliadx,
        sum1,
        sum2
    });
});

module.exports = router;