import React from 'react';
import {render} from 'react-dom';
import './css/c.css';

var C=React.createClass({
    _dragStart:function(event){
        event.dataTransfer.setData("C",JSON.stringify({type:'C',data:'it is component C'}));
    },
    render:function(){
        let data=null;
        if(this.props.data!==undefined&&this.props.data!==null)
        {
            data=<span>{this.props.data}</span>
        }else
            data=<span>it is component C</span>
        return (
            <div  className="c" draggable={true} onDragStart={this._dragStart}>
                {data}
                {this.props.children}
            </div>
        );
    }
});
module.exports=C;