'use strict'

var mongoose = require ('mongoose');
const app = require('../app');
var Schema = mongoose.Schema;

var ArticleSchema= Schema({ /*propiedades del esquema que va a tener, 
    a nivel java script con node, y a nivel del documento en base de datos*/
    title: String,
    content: String,
    date:{type: Date, default: Date.now},/*con "{}" dentro de este JSON, 
    se definen diferentes propiedades/campos/caracteristicas a el campo/JSON*/
    image: String,
})
module.exports=mongoose.model('Article',ArticleSchema); /*ESTO ES MUY IMPORTANTE PARA INTERACTUAR CON LA BASE DE DATOS('FIND/SAVE/UPLOAD/ETC'),
es una capa de extraccion intermedia que genera un modelo, y asi lograr mejor consultas y devolver datos correctos*/


//articles --> guarda documentos de este tipo y con la misma estructura dentro de la collectio