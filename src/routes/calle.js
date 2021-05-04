const express = require('express');
const router = express.Router();

const Persona = require('../models/Persona');
const isAuthenticated = require('../passport/local-auth');
const {vinculo} = require('../helpers/helpers');


router.get('/calle', isAuthenticated, (req,res) => {
    var _calle = ''
    var lista = false
    res.render('calle',{
        lista,
        _calle
    });
});

router.post('/calle', isAuthenticated, (req,res)=> {
    const calle = req.body.calle;

    res.redirect(`/calle/${calle}/1`);
})


router.get('/calle/:_calle/:_page', isAuthenticated, async (req, res) => {
    var vinculos = await vinculo()
    const {_calle, _page } = req.params
    const lista = await Persona.paginate({
        domicilio: {
            $regex: _calle,
            $options: 'si'
        }
    },{page: _page, limit: 20})
    res.render('calle',{
        lista,
        vinculos,
        _calle
    })
})

module.exports = router