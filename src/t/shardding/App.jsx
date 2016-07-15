import React from 'react';
import {render} from 'react-dom';
import { Link } from 'react-router'

var App=React.createClass({

    render:function(){
        return(
            <div>
                App
                <hr/>
                {this.props.children}
                <hr/>
                <div>
                    <Link to="/StructorO/shardding/index.html/A">A</Link>
                    <Link to="/StructorO/shardding/index.html/B">B</Link>
                    <Link to="/StructorO/shardding/index.html/C">C</Link>
                </div>
            </div>)
    }
});
module.exports=App;