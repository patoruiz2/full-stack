import React,{Component} from 'react';
import logo from '../assets/image/logo.svg'
import {NavLink} from 'react-router-dom';
class Header extends Component{

    render(){
        return(
            
            <header id="header">
            <div className="center">
            
                <div id="logo">
                    <img src= {logo} className="app-logo" alt="Logotipo" height="250px" width="50"/>
                    <span id="brand">
                        <strong>BLOG</strong>NSLP
                    </span>
                </div>

                <nav id="menu">
                    <ul>
                        <li>
                            <NavLink to ="/home" activeClassName="active">Inicio</NavLink>
                        </li>
                        <li>
                            <NavLink to ="/blog" activeClassName="active">Blog</NavLink>
                        </li>
                        <li>
                            <NavLink to ="/formulario" activeClassName="active">Formulario</NavLink>
                        </li>
                        <li>
                            <NavLink to ="/peliculas" activeClassName="active">Peliculas</NavLink>
                        </li>
                    </ul>
                </nav>
                
                <div className="clearfix"></div>
            </div>
        </header>
      
        )
    }
}
export default Header;