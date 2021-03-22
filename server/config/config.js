//  ================================
//              PORT
//  ================================

process.env.PORT = process.env.PORT || 3000;

//  ================================
//             ENTORNO
//  ================================

process.env.NODE_ENV = process.env.NODE_ENV || "dev";

//  ================================
//      Venciminento del token
//  ================================
// 60 segungos
// 60 minutos
// 24 horas
// 30 dias
process.env.CADUCIDAD_TOKEN = "96h";

//  ================================
//      SEED de autenticacion
//  ================================

//  ================================
//                 BD
//  ================================

let urlDB;
if (process.env.NODE_ENV === "dev") {
    urlDB = "mongodb://localhost:27017/santa-isabel-turistico";
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

module.exports.SEED = 'firma-santa-isabel';