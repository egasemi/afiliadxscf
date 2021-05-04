const Persona = require('../models/Persona')

var desplegable = async function desp() {
    var array = await Persona.distinct('vinculos.difusion.lugar')
    return lugares = array.sort();   
}

var vinculo = async function vinc() {
    var array1 = await Persona.aggregate([
        { "$project": {
          "data": { "$objectToArray": "$vinculos" }
        }},
        { "$project": { "data": "$data.k" }},
        { "$unwind": "$data" },
        { "$group": {
          "_id": null,
          "keys": { "$addToSet": "$data" }
        }}
      ])
    return vinculos = array1[0].keys.sort();
}

module.exports = {desplegable, vinculo}