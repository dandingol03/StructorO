import React from 'react';
import {render} from 'react-dom';
import Blank from '../wrapper/Blank.jsx';

import '../../css/edit.css';

var ProxyQ = require('../proxy/ProxyQ');
var SyncStore=require('../flux/stores/SyncStore');
var SyncAction = require('../flux/actions/SyncActions');

var Edit=React.createClass({
    _onExport:function(data){
        //TODO:special your route
        if(data!==undefined&&data!==null&&data.detail.export==true)
        {
            console.log('export.....');
            var _tree=SyncStore.getTree();
            ProxyQ.queryHandle(
                null,'/do_export.do',
                {
                    framework:'AppReact',
                    _tree:JSON.stringify(_tree),
                    route:JSON.stringify({name:this.state.name,url:this.state.url})
                },
                null,
                function(){
                    console.log('export success.....');
                }.bind(this)
            );
        }
    },
    fetch_node:function(){
        ProxyQ.queryHandle(null,'/get_node.do', {url:this.state.url,name:this.state.name},null,function(response) {
            let _node=null;
            if(response._node!==undefined&&response._node!==null)
            {
                _node = response._node;
                if(Object.prototype.toString.call(_node)=='[object String]')
                    _node = JSON.parse(_node);
                SyncAction.sync(_node,function(){
                    console.log('sync success');
                });
                this.setState({data: _node});
            }
        }.bind(this));
    },
    getInitialState:function(){
        let url=null;
        if(this.props.params.url!==undefined&&this.props.params.url!==null)
        {
            url=this.props.params.url;
            if(url=='blank')
                url='/';
        }
        else
            url='/';
        let name=null;
        if(this.props.params.name!==undefined&&this.props.params.name!==null)
            name=this.props.params.name;
        return ({data: null,url:url,name:name});
    },
    render:function(){

            var Edit=null;

            if(this.state.data==null)
            {
                SyncAction.sync({},function(){
                    console.log('sync success');
                });
                this.fetch_node();
                Edit=
                    <Blank {...{type:'Basic'}}>
                    </Blank>;
            }
            else
            {

                Edit=
                    <Blank {... this.state.data}>
                    </Blank>;
            }

            return Edit;

    },
    componentDidMount:function(){
        var dom_node=$("#export")[0];
        dom_node.addEventListener("export",this._onExport);
    },
    componentWillUnmount:function(){
        var dom_node=$("#export")[0];
        dom_node.removeEventListener("export",this._onExport);
    }
});
module.exports=Edit;