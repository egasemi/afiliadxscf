const express = require('express');
const mongoose = require('mongoose')
const router = express.Router();
const Persona = require('../models/Persona');
const isAuthenticated = require('../passport/local-auth');

async function desplegable() {
    var array = await Persona.distinct('distrito')
    return lugares = array.sort();   
}

router.get('/persona/:id', isAuthenticated, async (req, res) => {
    const query = await Persona.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(req.params.id)
            }
        },
        {
            $project: {
                datosGenerales: "$$ROOT",
                vinculos: "$vinculos",
                creada: '$createdAt',
                modificada: '$updatedAt'
            }
        },
        {
            $project: {
                "datosGenerales._id": false,
                "datosGenerales.password": false,
                "datosGenerales.vinculos" : false,
                "datosGenerales.createdAt": false,
                "datosGenerales.updatedAt": false
            }
        },{
            $addFields: {
                "datosGenerales.nacimiento": {
                    $dateToString: {
                        format: '%d/%m/%Y',
                        date: "$datosGenerales.nacimiento"
                    }
                }
            }
        }
    ])
    var persona = query[0]

    res.render('persona',{persona})
})

router.get('/persona/respuesta/:id', isAuthenticated, async (req, res) => {
    const {tipo, id} = req.params
    var persona = await Persona.findById(id);
    persona.contacto.respuesta = !persona.contacto.respuesta;
    persona.save()
    res.redirect(`${req.headers.referer}#${id}`)
})

router.get('/persona/borrar/:id', isAuthenticated, async (req, res) => {
    var persona = await Persona.findById(req.params.id)
    persona.visible = !persona.visible
    //persona.save();
    res.redirect('/')
})

router.get('/persona/editar/:id', isAuthenticated,async (req, res) => {
    await desplegable()
    back = req.headers.referer
    var query = await Persona.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId(req.params.id)
            }
        },{
            $addFields: {
                nacimiento: {
                    $dateToString: {
                        format: '%Y-%m-%d',
                        date: "$nacimiento"
                    }
                }
            }
        }
    ]);
    var persona = query[0]
    res.render('persona_edit',{persona, lugares, back})
})

router.post('/persona/editar/:id', isAuthenticated, async (req, res) => {

    var persona = await Persona.findByIdAndUpdate(req.params.id, req.body)
    persona.save()
    if (back === undefined) {
        res.redirect(req.headers.referer)
    } else {
        res.redirect(`${back}#${req.params.id}`)
    }
})

module.exports = router