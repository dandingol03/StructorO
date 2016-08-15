import React from 'react';
import {render} from 'react-dom';
import Blank from '../wrapper/Blank.jsx';

var ProxyQ = require('../proxy/ProxyQ');
var SyncStore=require('../flux/stores/SyncStore');
var SyncAction = require('../flux/actions/SyncActions');

var Home=React.createClass({
    fetch_node:function(){
        ProxyQ.queryHandle(null, '/get_node.do', {url:'/',name:'Home'}, null, function (response) {
            if(response.re==-1)
            {}else{
                if(response._node!==undefined&&response._node!==null)
                {
                    let _node=response._node;
                    if(Object.prototype.toString.call(_node)=='[object String]')
                        _node = JSON.parse(_node);
                    this.setState({data: _node});
                    //TODO:sync remote data with inside data
                    SyncAction.sync(_node,function(){
                        console.log('sync success');
                    });
                }
            }
        }.bind(this));
    },
    getInitialState:function(){
        var exportable=null;
        if(this.props.exportable!==undefined&&this.props.exportable!==null)
            exportable=this.props.exportable;
        else
            exportable=false;
        return ({data:null,exportable:exportable});
    },
    render:function(){

        if(this.state.exportable==false)
        {
            return(
                <div className="Home">dw</div>
            );
        }
        else{
            if(this.state.data!==null&&this.state.data!==undefined)//渲染二叉树的结点数据
            {
                return (
                    <div className="Home">
                        <Blank {...this.state.data}>
                        </Blank>
                    </div>
                );
            }else{
                this.fetch_node();
                return(
                    <div className="Home">
                        <Blank {...{type:'Basic'}}>
                        </Blank>
                    </div>
                    );
            }
        }

    }
});
module.exports=Home;