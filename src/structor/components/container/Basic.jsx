import React from 'react';
import {render} from 'react-dom';
import '../../css/basic.css';
let Basic=React.createClass({
    dropEnable:function(){
        return true;
    },
    render:function(){
        return (
          <div className="basic">
              {this.props.children}
          </div>
        );
    }
});
module.exports=Basic;