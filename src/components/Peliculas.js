import React, {Component} from 'react';
import Pelicula from './Pelicula';

class Peliculas extends Component{

    state ={
        peliculas :[

            {
                titulo: "Joker",image:'https://i1.wp.com/www.sopitas.com/wp-content/uploads/2018/02/heath-ledger-joker.jpg'
            },
            {
                titulo: "Batman vs Superman",image: "https://www.cinemascomics.com/wp-content/uploads/2020/06/snyder-cut-batman-vs-superman-960x560.jpg"
            },
            {
                titulo: "Terminator", image:"https://media.revistagq.com/photos/5dbab1e1d19dec0008a41e77/16:9/w_1920,c_limit/terminator%20portada.jpg"
            },
            {
                titulo: "Top Gun", image: "https://imagenes.20minutos.es/files/image_656_370/uploads/imagenes/2008/07/22/850446a.jpg"
            },  
        ],
        nombre:"Patricio Ruiz",

        favorita: {}
    };
    cambiarTitulo =()=>{
     var {peliculas}  = this.state;
     peliculas[0].titulo = "Joker Parte1";
        this.setState({
            peliculas:peliculas
        });
    }
    favorita=(peliculas,indice)=>{
        console.log("Favorita marcada");
        console.log(peliculas,indice);
        this.setState({
            favorita:peliculas,
        })
    }

    render(){
        var pStyle={
            background:'green',
            color:'white',
            padding:'10px',
        }
        var favoritaPel
        if (this.state.favorita.titulo){
            favoritaPel=(
                <p className="favorita" style={pStyle}>
                    <strong>La pelicual favorita es:</strong>
                    <span> {this.state.favorita.titulo} </span>
                </p>
            )
        } else{
            favoritaPel =<p>No hay pelicula favorita</p>
        }
        return(
            <div id="content" className="pelicula">
                <h2 className="subheader">Peliculas</h2>
                <p>Peliculas de {this.state.nombre}</p>
                <p>
                    <button onClick={this.cambiarTitulo} >Cambiar titulo</button>
                </p>
                
                {favoritaPel}

                <div id="articles" className="pelicula">
                {
                    this.state.peliculas.map((peliculas,i)=>{
                        return(
                            <Pelicula key={i} 
                            peliculas ={peliculas}
                            indice={i} 
                            marcarFav={this.favorita}/>
                            
                        );
                    })
                               
                }
                </div>
            </div>
        )
    }
}
export default Peliculas;