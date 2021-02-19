const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const afiliadxSchema = new Schema({
    dni: Number,
    jurisdiccion: String,
    distrito: String,
    apellido: String,
    nombre: String,
    sexo: String,
    clase: String,
    nacimiento: Date,
    profesion: String,
    contacto: String,
    confirmada: Boolean
},{
    versionKey:false,
    timestamps: true
})

module.exports = mongoose.model('afiliadxs', afiliadxSchema)