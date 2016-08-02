import React from 'react';
import {render} from 'react-dom';
var SyncStore=require('../flux/stores/SyncStore');
var ProxyQ=require('../proxy/ProxyQ');
var Container=React.createClass({
    _onExport:function(data){
        console.log('....');
        console.log('....');
        if(data!==undefined&&data!==null&&data.detail.export==true)
        {
            //TODO:export data
            console.log('export.....');
            var _tree=SyncStore.getTree();
            ProxyQ.queryHandle(
                null,'do_export.do',
                {
                   framework:'AppReact',
                    _tree:JSON.stringify(_tree)
                },
                null,
                function(){
                    console.log('export success.....');
                }.bind(this)
            );
        }
    },
    render:function(){
      return (
          <div>
              {this.props.children}
          </div>
      )
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
module.exports=Container;