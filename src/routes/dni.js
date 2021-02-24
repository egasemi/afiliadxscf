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
        const consulta = await Afiliadx.find({dni: _dni});
        if (consulta.length > 0) {
            var nombre = consulta[0].nombre.split(' ')[0];
            var apellido = consulta[0].apellido;
            if (consulta[0].confirmada === true) {
                afiliadx.texto = `${nombre} ${apellido} está afiliadx!`;            
                afiliadx.color = 'success'
            } else {
                afiliadx.texto = `La afiliación de ${nombre} ${apellido} fue enviada pero rebotó o se cayó :/`;
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