import React from 'react';
import {render} from 'react-dom';
var ProxyQ = require('../proxy/ProxyQ');


var Home=React.createClass({



    getInitialState:function(){
        return ({_nodes:null});
    },
    render:function(){
        if(this.state._nodes!==null&&this.state._nodes!==undefined)//渲染二叉树的结点数据
        {

        }else{
            return(
                <div className="Home"></div>
            );
        }
    }
});
module.exports=Home;