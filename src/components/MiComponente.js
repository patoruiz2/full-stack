import React from 'react';


class MiComponente extends React.Component{
        render() { 
        
        
        let receta = {
            nombre:"Pizza",
            ingredientes: ["Muzarella","Tomate","Jamon","Cebolla","Harina"],
            calorias:500,
        };
        
            return(
                <React.Fragment>
                    <h1> {"Nombre: "+ receta.nombre}</h1>
                    <h2>{"Calorias: "+ receta.calorias}</h2>
                    {this.props.saludo &&
                    <h3>{this.props.saludo}</h3>
                    }
                    <ol>
                    {
                        receta.ingredientes.map((ingrediente,i)=>{
                            return(
                                
                                <li key={i}>
                                    {ingrediente}
                                </li> 
                            )
                        })
                    }
                    </ol>
                </React.Fragment>
            );
        }
}
export default MiComponente;
