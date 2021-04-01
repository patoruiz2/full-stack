
import React , {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MiComponente from './components/MiComponente';
import Peliculas from './components/Peliculas';
import Error from './components/Error';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Blog from './components/Blog';
import Formulario from './components/Formulario';





class Router extends Component{

    render(){
        
        return(
            
            <BrowserRouter>
            <Header/>
           
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route exact path="/home" component={Home}/>
                    <Route exact path="/Blog" component={Blog}/>
                    <Route exact path= "/formulario" component={Formulario}/>
                    <Route exact path= "/peliculas" component={Peliculas}/>

                    <Route exact path= "/blog/articulo/:id" render = {()=>(
                        <h1>Pagina del articulo</h1>
                    )}/>

                    <Route exact path="/segunda-ruta" component={MiComponente}/>
                    <Route exact path="/pagina-1" render={()=>(
                        <div>
                            <h1>Chicos estamos en la pagina 1</h1>
                            <MiComponente saludo="ACA ESTA LA PROP"/>   
                        </div>
                    )}/>
                    <Route exact path="/pruebas/:nombre/:apellido?" render={(props)=>{
                      var nombre = props.match.params.nombre;
                      var apellido = props.match.params.apellido;  
                        return(
                            <div id="content">
                                <h1 className="subheader">Pagina de pruebas</h1>
                                <h2>
                                    {nombre && !apellido &&
                                        <span>{nombre}</span>
                                    }
                                    {nombre && apellido &&               
                                    <span>{nombre} {apellido}</span>
                                    }
                                    </h2>
                            </div>
                        )
                    }}/>
                    <Route component={Error}/>
                    
                </Switch>
                
                <div className='clearfix'></div>
                <div/>
                <Footer/>
            </BrowserRouter>

        );
    }
}
export default Router;