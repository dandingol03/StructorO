import React from 'react';
import {render} from 'react-dom';
import { Link } from 'react-router'
import Blank from '../../components/wrapper/Blank.jsx';
import App from '../../../../src/client/gen/graduate/serviceHobby/App.jsx';
var SyncStore=require('../flux/stores/SyncStore');
var SyncAction = require('../flux/actions/SyncActions');
var ProxyQ=require('../proxy/ProxyQ');

/**
 *   1.Home和App是分开的
 *   2.则Home和App不可同时导出
 */

var Container=React.createClass({
    fetch_node:function(){
        ProxyQ.queryHandle('GET', '/get_node.do', null, null, function (response) {
            console.log('...');
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
        }.bind(this));
    },
    fetch_gen:function()
    {
        setTimeout(function () {
            this.setState({gen: true});
        }.bind(this), 300);
    },
    _onUrlChanged:function(data)
    {
        if(data!==undefined&&data!==null)
        {
            var route=data.detail.route;
            if(route.name!=='App')//convert app.json to App.jsx
            {
                this.setState({exportable: false});
            }else//convert App.jsx to app.json
            {
                this.setState({exportable: true});
            }
        }
    },
    _onExport:function(data){
        if(data!==undefined&&data!==null&&data.detail.export==true)
        {
            //TODO:export data
            console.log('export.....');
            var _tree=SyncStore.getTree();
            ProxyQ.queryHandle(
                null,'do_export.do',
                {
                   framework:'AppReact',
                    _tree:JSON.stringify(_tree),
                    route:JSON.stringify(data.detail.route)
                },
                null,
                function(){
                    console.log('export success.....');
                }.bind(this)
            );
        }
    },
    getInitialState:function(){
        return ({data: null,exportable:true,gen:null});
    },
    render:function(){
        if(this.state.exportable==true)//可导出可编辑
        {
            if(this.state.data==null||this.state.data==undefined)
            {
                //f(this.props.auto==true)
                this.fetch_node();
                return(
                    <div className="Container">
                        <Blank {...{type:'Basic'}}>
                        </Blank>
                    </div>
                );
            }
            else{
                console.log('...');
                console.log('...');
                return (
                    <div>
                        <Blank {...this.state.data}>
                        </Blank>
                        <Link to='/get_render_page.do/password'>link to password modify</Link>
                        {this.props.children}
                    </div>
                )
            }
        }else{
            if(this.state.gen==null)//拉取生成的源代码文件
            {
                this.fetch_gen();
                return(
                  <div>
                  </div>
                );
            }else{
                return (
                    <div className="Container">
                        <App/>
                        {this.props.children}
                    </div>
                );
            }
        }
    },
    componentDidMount:function(){
        var dom_node=$("#export")[0];
        dom_node.addEventListener("export",this._onExport);
        var url_node=$('#_url_change')[0];
        url_node.addEventListener("__url__change",this._onUrlChanged);
    },
    componentWillUnmount:function(){
        var dom_node=$("#export")[0];
        dom_node.removeEventListener("export",this._onExport);
        var url_node=$('#_url_change')[0];
        url_node.removeEventListener("__url__change",this._onUrlChanged);
    }
});
module.exports=Container;