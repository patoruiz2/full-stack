'use strict'

var express= require('express');
var ArticleController= require('../controllers/article');

var router = express.Router();
var multiparty = require('connect-multiparty');//cargar el modulo multiparty (midelware)
var md_upload = multiparty({uploadDir:'./upload/articles'});//uploadDir->direccion donde guarda los archivos "upload/articles"
//rutas de pruebas
router.post('/datos-curso',ArticleController.datosCurso);
router.get('/test-de-controlador', ArticleController.test);

//rutas utiles
router.post('/save',ArticleController.save);
router.get('/articles/:last?',ArticleController.getArticles);
router.get('/article/:id',ArticleController.getArticle);
router.put('/article/:id',ArticleController.update);/*put es para actualizar*/
router.delete('/article/:id',ArticleController.delete);
router.post('/upload-image/:id',md_upload,ArticleController.upload);
router.get('/get-image/:image',ArticleController.getImage);
router.get('/search/:search',ArticleController.search);//los ":" significa que le vamos a pasar un parametro, con ? es opcional, caso contrario es obligatorio
module.exports= router;