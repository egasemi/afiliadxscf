const express = require('express');
const router = express.Router();
const { MD5 } = require('crypto-js')

const Afiliadx = require('../models/Afiliadx');

//nuevo afiliadx
/*router.post('/', async (req,res) => {
    const afiliadx = new Afiliadx(req.body);
    await afiliadx.save();
    res.redirect('/');
});*/

// index
router.get('/', (req,res) => {
    function numRandom(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }
    sum1 = numRandom(1,11)
    sum2 = numRandom(1,11)
    resultado = sum1 + sum2
    afiliadx = {
        texto: '',
        display: 'invisible',
        color: ''
    }
    res.render('index',{
        resultado,
        afiliadx,
        sum1,
        sum2
    });
});

// ver afiliadx
router.get('/c/:_dni/:_suma', async (req,res) => {
    function numRandom(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    const { _dni } = req.params;
    const { _suma } = req.params;
    afiliadx = {
        texto : '',
        display: 'visible',
        color: ''
    }
    console.log(_suma, resultado)

    if (resultado === parseInt(_suma)) {
        const consulta = await Afiliadx.find({dni: _dni});
        if (consulta.length > 0) {
            afiliadx.texto = 'Afiliadx!';            
            afiliadx.color = 'success'
        } else {
            afiliadx.texto = 'Sin afiliar';
            afiliadx.color = 'warning'
        }
    } else {
        afiliadx.texto = 'Sacaste mal la cuenta';
        afiliadx.color = 'danger'
    }
    var sum1 = numRandom(1,11)
    var sum2 = numRandom(1,11)
    resultado = sum1 + sum2
    res.render('index',{
        afiliadx,
        sum1,
        sum2
    });
});

// cambiar estado
/*router.get('/activo/:id', async (req,res) => {
    const { id } = req.params;
    const afiliadx = await Afiliadx.findById(id);
    afiliadx.activo = !afiliadx.activo;
    await afiliadx.save();
    res.redirect('/afiliadx')
});

// eliminar afiliadx
router.get('/delete/:id', async (req, res) => {
    const {id} = req.params;
    await Afiliadx.deleteOne({_id:id});
    res.redirect('/afiliadx')
});

// editar afiliadx
router.post('/guardar/:id', async (req, res) => {
    const { id } = req.params;
    await Afiliadx.updateOne({_id:id},req.body);
    res.redirect('/afiliadx');
})*/

module.exports = router;