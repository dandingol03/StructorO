import React from 'react';
import {render} from 'react-dom';

var Input=React.createClass({
    render:function(){
        let name=this.props.ctrlName;
        return (
            <input type="text" {...this.props} name={name}/>
        );
    }
});
module.exports=Input;