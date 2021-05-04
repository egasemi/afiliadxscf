const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const paginator = require('mongoose-paginate-v2');

const personaSchema = new Schema({
    dni: Number,
    vinculos: {
        afiliada : {
            estado: Object,
            confirmada: Boolean
        },
        difusion: {
            codigo: String
        },
        sociamai: {
            circulo: Number
        },
        congresala: {
            activa: Boolean
        }
    },
    contacto: {
        numero: String,
        respuesta: Boolean
    },
    nacimiento: Date,
    domicilio: String,
    nombre: String,
    apellido: String,
    email: String,
    password: String
},{
    versionKey: false,
    timestamps: true
})

personaSchema.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

personaSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

personaSchema.plugin(paginator)

module.exports = mongoose.model('personas', personaSchema)