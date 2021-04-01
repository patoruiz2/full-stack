import React, {Component} from 'react';
import SideBar from './SideBar';

class Formulario extends Component{
    nombreRef = React.createRef();
    apellidosRef = React.createRef();
    detalleRef = React.createRef();
    generoHRef = React.createRef();
    generoMRef = React.createRef();
    generoOtroRef = React.createRef();
    
    state={
        user:{},
    };
    
    recibirForm = (e)=>{
        e.preventDefault();
        
        var genero="hombre";
        if(this.generoHRef.current.checked){
            genero = this.generoHRef.current.value;
        }else if(this.generoMRef.current.checked){
            genero = this.generoMRef.current.value
        }else {
            genero = this.generoOtroRef.current.value
        };
        
        var user = {
            nombre: this.nombreRef.current.value,
            apellidos: this.apellidosRef.current.value,
            detalle:this.detalleRef.current.value,
            genero: genero,
        };
        this.setState({
            user : user
        });
        console.log("Formulario enviado")
        console.log(user)
    }
    render(){
        if(this.state.user.nombre){
            var user = this.state.user;
        }
        return(
            <div id="formulario">
                <div className="center">
                    <div id="content">
                        <h1 className="subheader">Formulario</h1>
                        
                            {
                            this.state.user.nombre , this.state.user.apellido, this.state.user.detalle , this.state.user.genero &&
                            <div id="user-data">
                                <p>Nombre: <strong>{user.nombre}</strong></p>
                                <p>Apellido: <strong>{user.apellidos}</strong></p>
                                <p>Detalle: <strong>{user.detalle}</strong></p>
                                <p>Genero: <strong>{user.genero}</strong></p>
                                
                            </div>
                            }

                               

                        
                        <form className="mid-form" onSubmit={this.recibirForm} onChange={this.recibirForm}>
                            <div className="form-group">
                                <label for="nombre">Nombre</label>
                                <input type="text" name="nombre" ref={this.nombreRef}/>
                            </div>

                            <div className="form-group">
                                <label for="apellidos">Apellido</label>
                                <input type="text" name="apellidos" ref={this.apellidosRef}/>
                            </div>

                            <div className="form-group">
                                <label for="detalle">Detalle</label>
                                <textarea name="detalle" ref={this.detalleRef}></textarea>
                            </div>

                            <div className="form-group radiobuttons">
                                <input type="radio" name="genero" value="hombre" ref={this.generoHRef}/>Hombre
                                <input type="radio" name="genero" value="mujer" ref={this.generoMRef}/>Mujer
                                <input type="radio" name="genero" value="otro" ref={this.generoOtroRef}/>Otro
                            </div>
                            <div className="clearfix"></div>

                            <input type="submit" value="Enviar" className="btn btn-success"/>
                        </form>
                    </div>
                
                    <SideBar
                        blog="false"
                    /> 
                </div>
            </div>
            
        )
    }
}
export default Formulario;