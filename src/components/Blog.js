import React, {Component} from 'react';
import Slider from './Slider';
import SideBar from './SideBar';
import Article from './Articles';

class Blog extends Component{

    state ={
        articles:{},
        status:null,
    }
    
    render(){

       

        return(
            <div id="blog">
                <Slider 
                    title="Blog"
                    size="slider-small"
                />
                <div className="center">
                    <div id="content">
                        
                        <Article/>
                        
                        
                    </div>
                    <SideBar
                        blog="true"
                    /> 
                </div>
            </div>
        )
    }
}
export default Blog;