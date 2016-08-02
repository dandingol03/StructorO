import React from 'react';
import {render} from 'react-dom';
import '../../css/shadow.css';
var Shadow=React.createClass({
    getStyle:function(){
      return {width:this.props.width,height:this.props.height};
    },
    render:function(){
        if(this.props.width!==undefined&&this.props.height!==undefined&&this.props.width!==null&&this.props.height!==null)
        {
            return <div className="shadow" style={this.getStyle()}></div>
        }
        else{
            return <div></div>
        }
    }
});
module.exports=Shadow;