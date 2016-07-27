import React from 'react';
import {render} from 'react-dom';


var A=React.createClass({
    _dragStart:function(event){
        event.dataTransfer.setData("A",JSON.stringify({type:'A',data:'it is component A'}));
    },
    render:function(){
        let data=null;
        if(this.props.data!==undefined&&this.props.data!==null)
        {
            data=<span>{this.props.data}</span>
        }else
        data=<span>it is component A</span>
        return (
            <div style={{border:"1px dashed #00f"}} className="A" draggable={true} onDragStart={this._dragStart}>
                {data}
                {this.props.children}
            </div>
        );
    }
});
module.exports=A;