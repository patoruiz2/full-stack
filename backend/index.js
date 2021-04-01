/*CONEXION A BASE DE DATOS Y SERVIDOR*/
'use strict' /* hace estricto JS y mejoras en el lenguaje*/
var mongoose = require('mongoose'); /*con esto puedo usar mongoose*//*el uso de promesas facilitan el uso de mongodb evitando sus fallos*/
var app = require('./app');
var port = 3900;
 
mongoose.set('useFindAndModify', false); /*elimina o desactiva los metodos antiguos de mongoose*/
 mongoose.promise = global.promise;



mongoose.connect('mongodb://localhost:27017/api_rest_blog',{useNewUrlParser:true, useUnifiedTopology:true})
/*nos permite usar la nuevas funcionalidades de mongodb*/.then(()=>{ 
    console.log("la conexion a la base de datos es OK")/*cuando se conecta usando la promsea de calvac, se ejecuta dentro de "connect"*/

    app.listen(port,()=>{
        console.log('servidor OK  '+ port);
    });
});