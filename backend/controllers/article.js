'use strict'
var validator =require('validator');
var fs=require('fs');
var path=require('path');


var Article = require('../models/article');

const { model } = require("mongoose");
const { exists } = require('../models/article');

var controller = {
    datosCurso: (req,res)=> {
        var hola = req.body.hola;
        return res.status(200).send ({
            curso:'programacion 3',
            autor:'Miguel Villeli',
            url:'www.nslp.me',
            hola,
        })
    },
    test: (req,res)=>{
        return res.status(200).send({
            status: 'success',
            message: 'Testeo de articulo: OK'
        });
    },
//ACCION PARA GUARDAR LOS DATOS QUE MANDA EL USUARIO
save: (req,res)=>{

    //TOMAR LOS PARAMETROS POR POST
    var params= req.body;   //la encargada de recojer los parametros por POST ("params")
    // para probar si funciona "console.log (params);"


    //VALIDAR DATOS(VALIDATOR)
    try{
        var validate_title= !validator.isEmpty(params.title);/*"!"al principio es lo contrario a "isEmpty", es decir que si
        params.tittle tiene datos, entonces x accion*/
        var validate_content= !validator.isEmpty(params.content);
        

    }catch (err){
        return res.status(200).send({
            status : 'Error',
            message:'Faltan datos por enviar'
        });
    }/*cree una estructura try catch , si try falla entra por catch y captura una excepcion. Si hay error es en titulo o contendio
    el cual vamos a validar con el try*/
    if(validate_title && validate_content){//asi validamos si el title y content, en estos casos, son correctos
      //CREAR OBJETO A GUARDAR
        var article = new Article();    //usamos la clase del modelo aca, "ARTICLE"//

    //ASIGNAR VALORES al objeto
    article.title = params.title;
    article.content = params.content;
    article.image = null;


    //GUARDAR EN LA BASE DE DATOS
        article.save((err,articleStored)=>{

            if (err|| !articleStored){
                return res.status(404).send({
                    status: 'Error',
                    message: 'el articulo no se guardo'
                });
            }
            //DEVOLVER RESPUESTA

             return res.status(200).send({
                status : 'success',
                article : articleStored
            }); 

        });        
    }else{
        return res.status(200).send({
            status : 'Error',
            message:'los datos no son validos'
            });  
    }
    
},
    //TRAE TODOS LOS ARTICULOS GUARDADOS EN LA BASE DE DATOS MONGO
    getArticles:(req,res)=>{
        var query =Article.find({})
        var last = req.params.last; //esta variables es una ruta opcional ("?") en "articles/routes" y recibe lo que llega
        
        if (last||last != undefined){
            query.limit(5);
        }
        
        //Metodo FIND
        query.sort('-_id').exec((err,articles)=>{ //se puede poner condiciones para traer datos con X criteerios en "find"
        //sort ordena de menor a mayor segun el criterio
          if(err) { 
                return res.status(500).send({
                    status : 'Error',
                    message:'Error al devolver los articulos'
                });  
            }

        if(!articles){
                return res.status(404).send({
                    status : 'Error',
                    message: 'No hay articulos para mostrar'
                });
            }   
            return res.status(200).send({
                status:'Success',
                articles,
            })
        });


        
    },
    getArticle:(req,res)=>{
//tomar id de la url
        var articleId = req.params.id;

//comprobar que exista
        if(!articleId||articleId==null){
            return res.status(404).send({
                status:"Error",
                message:"El articulo no existe",
            });
        }

//Buscar el articulo
        Article.findById(articleId,(err,article)=>{
            if(err||!article){
                return res.status(404).send({
                    status:"Error",
                    message:"el articulo no existe",
                });
            }
            //Enviar respuesta y devolverlo
            return res.status(200).send({
                status:"Success",
                article,
            });
        });
    },
//ACTUALIZAR UN ELEMENTO DETERMINADO
    update: (req,res)=>{

        //tomar ID del articulo de la URL
        var articleId = req.params.id;  /*se toma el articulo que llega por la URL*/
        //Tomar los datos que llegan por PUT
        var params = req.body;  /*todo lo que venga en la peticion*/

        //Validar datos
        try{
           var validate_title = !validator.isEmpty(params.title);
           var validate_content = !validator.isEmpty(params.content);
        }catch(err){
            return res.status(200).send({
                status:"Error",
                message:"faltan datos",
            });
        }
        if (validate_title&&validate_content){
        //Find y Update
            //_id --> busca y trae por este id
            //articleId--> nos actualiza el articulo por el Id que le pasamos por la URL
            // params--> todo lo que yo quiero actualizar
            //parametro de opciones-->{new:true}--> devuelve el objeto que actualizo con la modificacion
            // (err,articleUpdate)--> recibir un error o un articleUpdate
            Article.findByIdAndUpdate({_id: articleId},params,{new:true},(err,articleUpdate)=>{
                if(err){
                    return res.status(500).send({
                        status:"Error",
                        message:"Error al actualizar",
                    });
                }
                if (!articleUpdate){
                    return res.status(404).send({
                        status:"Error",
                        message:"No existe el articulo",
                    });
                }
                return res.status(200).send({
                    status:"Success",
                    article:articleUpdate,
                });
            })
        }else{
            return res.status(200).send({
                status:"Error",
                message:"la validacion no es correcta",
            });
        }
    },
// BORRAR UN ELEMENTO DETERMINADO
    delete:(req,res)=>{
    //tomar id de la URL
        var articleId = req.params.id;
    //Find and delete
    //articleRemoved--> nos devuelve el articulo que se borro
    Article.findOneAndDelete({_id:articleId},(err,articleRemoved)=>{
        if(err){
            return res.status(404).send({
                status:"Error",
                message:"Error al borrar",
            });
        }
        if(!articleRemoved){
            return res.status(404).send({
                status:"Error",
                message:"El articulo no se ha borrado",
            });
        }
        //devolver respuesta
            return res.status(200).send({
                status: "Success",
                article : articleRemoved,
            });
    });
    
},
upload: (req,res)=>{
    //configurar el modulo del connectMultiparty "router/article.js"    


    //tomar el archivo de la peticion que nos envian
    var file_name = 'Imagen no subida';
    
        if(!req.files){
            return res.status(404).send({
                status: "error",
                message: file_name
            });
        }
    //conseguir el nombre y la extension del archivo
    var file_path=req.files.file0.path;//el directorio del archivo 
    var file_split=file_path.split('\\');//separa en un array el "path" del articulo subido, en este caso 3 partes

    //con las "\\" se le señala que segmentos separar

    /*advertencia en linux o mac*/

    //var file_split=file_path.split('/');

    //nombre del archivo
    var file_name=file_split[2];

    //extension del archivo seleccionado "[2]"

    var extension_split = file_name.split('.');//se separa a la extension con un "." por que se necesita el ".jpg"
    var file_ext = extension_split[1];//en "0"esta el nombre del archivo y en "1" la extension, ya que quedaria asi el array
    //-->"\\slWdqjG-rCO3N6oCm2_gYWD1.jpg"

    //Comprobar la extension -> solo imagenes, si no es valida borrar el archivo 
        if (file_ext!='png'&&file_ext!='jpg'&&file_ext!='gif'&&file_ext!='jpeg'){
        //borrar el archivo subido
            fs.unlink(file_path,(err)=>{
                return res.status(200).send({
                    status:'error',
                    message: 'la extension no es valida',
                });
            });   
    }else{
    //si esta bien y sacamos el id de la url
    var articleId = req.params.id;
    //Buscar el articulo, asignamos el nombre de la imagen y lo actualizamos.
    Article.findOneAndUpdate({_id:articleId},{image:file_name},{new:true},(err,articleUpdated)=>{
      if(err||!articleUpdated)  {
        return res.status(200).send({
            status:'Error',
            message: 'error al guardar la imagen del articulo',
        }); 
      }
        
        return res.status(200).send({
            status:'Success',
            article:articleUpdated,
        });
    });
        /*return res.status(200).send({
            fichero: req.files,
            split:file_split,
            file_ext,
        });*/
    };
},

getImage: (req,res)=>{
    var file=req.params.image;//recoge el nombre de la imagen

//sacar path completo
    var path_file = "./upload/articles/" + file;
    fs.exists(path_file,(exists)=>{//comprobar si el archivo existe o no 
        if(exists){
            return res.sendFile(path.resolve(path_file));
            //path --> mandamos la libreria cargada anterior mente "path = require(path)"
            //resolve--> resuelve la ruta "(path_file)" y saca el archivo como esta
        }else{
            return res.status(200).send({
                status:'Error',
                message: "la imagen no existe",
            });
        };
    });
    
    
},
//accion para buscar articulos en nuestro blog  ♥
    search:(req,res)=>{
    //sacar el string a buscar
        var searchString = req.params.search;
        //req--> recoje
        //params--> recibe lo de req
        //search--> donde llega lo que se recoje o por donde entra

    //find or
        Article.find({ "$or":[
            {"title":{"$regex":searchString,"$options":"i"}},
            {"content":{"$regex":searchString,"$options":"i"}},
            //si "searchString" esta en content/title, entonces sacar articulos que coincidan con estas expresiones
        ]

        })
        .sort([['date','descending']])//ordenar de forma descentente por fecha
        .exec((err,articles)=>{//se ejecuta y nos puede trar 2 cosas, un error "err" o los articulos "articles"

            if(err){
                return res.status(500).send({
                    status:'error',
                    message: "error en la peticion de busqueda",
                });    
            }
        if(!articles||articles.length<=0){
            return res.status(404).send({//send--> envia al exterior una respuesta
                status:'Error',
                message:"no hay articulos para mostrar",
            });
        }
        return res.status(200).send({
            status:"Success",
            articles,
        });      
    });
},
};//fin controller
module.exports = controller;