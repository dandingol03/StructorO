import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';
var A=React.createClass({

    render:function(){
        return (
            <div>
                A
                <hr/>
                <Link to="/StructorO/shardding/index.html/A/AA">AA</Link>
                {this.props.children}
            </div>
        )
    }

});
module.exports=A;