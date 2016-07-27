import React from 'react';
import {render} from 'react-dom';
import './css/b.css';
var B=React.createClass({
    dropEnable:function(){
      return true;
    },
    getInitialState:function(){
        return ({drop: null});
    },
    render:function(){

        var child=null;

        return (
            <div>
                <div className="b" ref="B">
                    <span>it is component B</span>

                    {this.props.children}
                </div>
                <div className="copy"></div>
            </div>

        );
    }
});
module.exports=B;