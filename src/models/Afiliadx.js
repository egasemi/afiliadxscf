const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs')

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
    confirmada: Boolean,
    password: String,
    domicilio: String,
    estado:{
        votante: Boolean,
        contactadx: Boolean,
        voto: Boolean
    },
    vinculos: Object
},{
    versionKey:false,
    timestamps: true
})

afiliadxSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

afiliadxSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('afiliadxs', afiliadxSchema)