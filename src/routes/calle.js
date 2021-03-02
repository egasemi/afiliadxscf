const express = require('express');
const router = express.Router();

const Afiliadx = require('../models/Afiliadx');
const isAuthenticated = require('../passport/local-auth');


router.get('/calle', isAuthenticated, (req,res) => {
    var _calle = ''

    afiliadx = {
        texto: '',
        display: 'invisible',
        color: ''
    }
    consulta = {display : 'invisible'}
    res.render('calle',{
        consulta,
        afiliadx,
        _calle
    });
});

router.post('/calle', isAuthenticated, (req,res)=> {
    const calle = req.body.calle;

    res.redirect(`/calle/${calle}`);
})


router.get('/calle/:_calle', isAuthenticated, async (req, res) => {
    const _calle = req.params._calle;
    afiliadx = {
        texto: '',
        color: '',
        display: 'visible'
    }

    var consulta = await Afiliadx.find({
        domicilio: {
            $regex: `${_calle}`,
            $options: 'si'
        }

    }).sort({apellido:'asc'})

    if (consulta.length > 0) {

        consulta.display = 'visible';
        afiliadx.display = 'invisible'

    }


    res.render('calle',{
        consulta,
        afiliadx,
        _calle
    })
})

module.exports = router