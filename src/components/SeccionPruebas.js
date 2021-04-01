import React, {Component} from 'react';
import { Simulate } from 'react-dom/test-utils';
import MiComponente from './MiComponente';


class SeccionPruebas extends Component{
    contador = 0;

    state ={
       contador: 0,
      };

     HolaMundo(nombre,edad){
        var presentacion = (
        <div>
          <h2>Soy {nombre}, un placer</h2>
          <h3>Tengo {edad}</h3>
        </div> 
        );
        return presentacion;
      }

      sumar=(e)=>{
        this.setState({
          contador:this.state.contador + 1,
        })
      }

      restar=(e)=>{
       this.setState({
        contador:this.state.contador - 1,
      })
      }

    render(){
        var nombre = 'Patricio Ruiz';

        return(
        <seccion id="content">
            <h2 className="subheader">Ultimos Articulos</h2>
            <h2 className="subheader">Funciones</h2>
            {this.HolaMundo(nombre,21)}
            <h2 className="subheader">Componentes</h2>
            
            <seccion className="componentes">
                <MiComponente/> 
                <MiComponente/>
            </seccion> 

            <h2 className="subheader">Estado</h2>

            <p>Contador:{this.state.contador}</p>

            <p>
              <input type="button" value="sumar" onClick={this.sumar}></input> 
              <input type="button" value="restar" onClick={this.restar}></input> 
            </p>

        </seccion>
      );
    }
}
export default SeccionPruebas;