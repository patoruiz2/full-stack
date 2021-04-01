/*carga peticiones, rutas, utilizacion de mideelwares*/
'use strict'

//CARGAR MODULOS DE NODE para crear el servidor
var express=require('express'); /*cargar modulo de node "express"*/

var bodyParser=require('body-parser'); /*recibir peticiones http y convertirlo en objeto utilizable por JSON*/

//ejecutar express para  HTTP
var app= express();
//cargar archivos de rutas

var article_routes=require('./routes/article');

//cargar middelwares es algo que se ejecuta antes de cargar una ruta o url. Se ejecuta siempre antes con el "use" que trae express por defecto 
app.use(bodyParser.urlencoded({extended:false})); /*le pasamos las funcionalidades del "body-parser"*/
app.use(bodyParser.json());/*cualquier peticion que llegue se carga en json*/

//activar cors--> activa relacion de confianza entre cualquier frontend y nuestra API, 
//ya que la API como seguridad prohibe la conexion con el exterior
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');//configurar para que cualquier cliente(*) haga peticiones ajax
    res.header('Access-Control-Allow-Headers','Authorization','X-API-KEY','Origin',
    'X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
})


//añadir prefijos a las rutas
app.use('/api',article_routes);
//ruta prueba
/*app.get("/probando", (req,res)=> {
    var hola=req.body.hola
    return res.status(200).send ({
        curso:'programacion 3',
        autor:'Miguel Villeli',
        url:'www.nslp.me',
        hola,
    })
    
});*/


//exportar modulos
module.exports=app;
