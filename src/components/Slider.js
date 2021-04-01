import React, {Component} from 'react';

class Slider extends Component{

    render(){
        return(
            <div id="slider" class={this.props.size}>
                <h1>
                    {this.props.title}
                </h1>
                {this.props.btn &&
                    <a href="/blog" class="btn-white">{this.props.btn}</a>
                }
                
            </div> 
        )
    }
}
export default Slider;
