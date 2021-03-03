const express = require('express');
const router = express.Router();

const Afiliadx = require('../models/Afiliadx');
const isAuthenticated = require('../passport/local-auth');


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

    res.redirect(`/calle/${calle}`);
})


router.get('/calle/:_calle', isAuthenticated, async (req, res) => {
    const _calle = req.params._calle
    const lista = await Afiliadx.find({
        domicilio: {
            $regex: _calle,
            $options: 'si'
        }
    }).sort({domicilio: 'asc'})
    res.render('calle',{
        lista,
        _calle
    })
})

module.exports = router