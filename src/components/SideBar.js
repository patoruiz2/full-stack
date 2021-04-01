import React, {Component} from 'react';

class SideBar extends Component{

    render(){
        return(
            <aside id="sidebar">
                {
                    this.props.blog === "true" &&
                    <div id="nav-blog" className="sidebar-item">
                        <h3>Podes hacer esto</h3>
                        <a href="#" className="btn btn-success">Crear articulo</a>
                    </div>
                }
                <div id="search" className="sidebar-item">
                    <h3>Buscador</h3>
                    <p>Encontra el articulo</p>
                        <form>
                            <input type="text" name="search" autocomplete="off" spellcheck="false"/>
                            <input type="submit" name="submit" value="buscar" class="btn"/>
                        </form>
                </div>
        </aside>
        )
    }
}
export default SideBar;