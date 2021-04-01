import React, {Component} from 'react';
import axios from 'axios';
import Global from '../components/Global';
import ImageDefault from '../assets/image/image_1024.png';
import Moment from 'react-moment';
import 'moment/locale/es';
import {Link} from 'react-router-dom';

class Articles extends Component{
    
    url = Global.url;
    
    state={
        articles:[],
        status: null,
    };
    
    componentDidMount(){
        var home = this.props.home;

        if (home === 'true'){
            this.getLastArticles()
        }else{
           this.getArticles(); 
        }

        
    }
    getLastArticles = ()=>{
        axios.get(this.url+'/articles/last')
        .then(res=>{
            this.setState({
                articles: res.data.articles,
                status: 'success',
            });
           
        });
    }

    
    
    getArticles = ()=>{
        axios.get(this.url+'/articles')
        .then(res=>{
            this.setState({
                articles: res.data.articles,
                status: 'success',
            });
            
        });
    }
    render(){

        if(this.state.articles.length >=1){

            var listArticles = this.state.articles.map((articles)=>{

                return(
                    <article className="article-item" id="article-template">

                        <div className="image-wrap">
                            {articles.image !== null ?
                                (<img src={this.url+'get-image/'+articles.image} alt={articles.image}
                                />
                                ):(
                                    <img src={ImageDefault}
                                    alt="Sin imagen"/>
                                )
                            }
                        </div>

                        <h2>{articles.title}</h2>

                        <span className="date">
                            <Moment fromNow>{articles.date}</Moment>
                        </span>

                        <Link to={'/blog/articulo/'+articles._id}>Leer mas</Link>

                        <div className="clearfix"></div>

                    </article>
                );
            })
            
            return(
                <div id= "articles">
                    {listArticles}
                </div>
                )

        }else if(this.state.articles.length === 0 && this.state.status==='success'){

            return(

                <div id="articles">
                    <h2 className="subheader">No hay articulos para mostrar</h2>
                    <p>Todavia no hay contenido en esta seccion</p>
                </div>
            )
        }else{

            return(

                <div id="articles">
                    <h2 className="subheader">Cargando...</h2>
                    <p>espere mientras carga el contenido</p>
                </div>
            )
        }

      
    }
}
export default Articles;