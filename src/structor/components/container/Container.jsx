import React from 'react';
import {render} from 'react-dom';
import { Link } from 'react-router'
import Blank from '../../components/wrapper/Blank.jsx';
var SyncStore=require('../flux/stores/SyncStore');
var ProxyQ=require('../proxy/ProxyQ');


/**
 *    <Blank data={{type:'Basic'}}>
 </Blank>
 */

var Container=React.createClass({
    fetch_nodes:function(){
        ProxyQ.queryHandle('GET', '/get_nodes.do', null, null, function (response) {
            console.log('...');
            if(response._nodes!==undefined&&response._nodes!==null)
            {
                let _nodes=response._nodes;
                if(Object.prototype.toString.call(_nodes)=='[object String]')
                    _nodes = JSON.parse(_nodes);
                this.setState({data: _nodes});
            }
        }.bind(this));
    },
    fetch_gen:function()
    {

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
        return ({data: null,exportable:true,json:null});
    },
    render:function(){
        if(this.state.exportable==true)//可导出可编辑
        {
            if(this.state.data==null||this.state.data==undefined)
            {
                //f(this.props.auto==true)
                this.fetch_nodes();
                return(
                    <div className="Container">
                        <Blank data={{type:'Basic'}}>
                        </Blank>
                    </div>
                );
            }
            else{
                console.log('...');
                console.log('...');
                console.log('...');
                return (
                    <div>
                        <Blank data={this.state.data}>
                        </Blank>
                        {this.props.children}
                    </div>
                )
            }
        }else{
            if(this.state.json==null)//拉取生成的源代码文件
            {
                this.fetch_json();
                return(
                  <div>
                  </div>
                );
            }else{
                //TODO:render App.jsx
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