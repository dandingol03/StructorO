import React from 'react';
import {render} from 'react-dom';

var MainSection=React.createClass({

    render:function(){
        var path=this.props.route.path;
        console.log('path=' + path);
        return (
            <div className="MainSection">....</div>
        );
    }
});
module.exports=MainSection;