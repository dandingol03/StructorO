import React from 'react';
import {render} from 'react-dom';
import Table from '../../../../framework/AppReact/components/basic/Table.jsx';
import Panel from '../../../../framework/AppReact/components/basic/Panel.jsx';
import Grid from '../../../../framework/AppReact/components/basic/Grid.jsx';
var  Components =require( '../../../../framework/AppReact/metadata/components.json');
var SyncStore=require('../../../../framework/AppReact/flux/stores/SyncStore');
var SyncActions = require('../../../../framework/AppReact/flux/actions/SyncActions');


var Front=React.createClass({
    backClick:function(){
        $("#preview").fadeOut();
    },
    saveClick:function(){
        SyncActions.paste(this.state.clipboard);
        $("#preview").fadeOut();
    },
    renderClipboard:function(ob){
        $("#preview").fadeIn(1000);
        var clipboard=new Object();
        clipboard.type=ob;
        clipboard.data=Components[ob];
        this.setState({clipboard: clipboard});
    },
    getInitialState:function(){
        return({clipboard:null});
    },
    render:function(){
        var ctrl=null;
        if(this.state.clipboard!==null&&this.state.clipboard!==undefined)
        {
            switch(this.state.clipboard.type)
            {
                case 'Table':
                    ctrl=<Table {...Components.Table}/>;
                    break;
                case 'Panel':
                    ctrl=<Panel {...Components.Panel}/>;
                    break;
                case 'Grid':
                    ctrl=<Grid {...Components.Grid}/>;
                    break;
                default:
                    break;
            }
        }

        return (
            <div>
                <button onClick={this.saveClick}>
                    save to clipboard
                </button>
                <button style={{position:"absolute",right:"20px",top:"20px"}} onClick={this.backClick}>
                    close me
                </button>
                {ctrl}
            </div>);
    },
    componentDidMount:function(){
        var instance=this;
        var dom_node=$("#clipboard")[0];
        dom_node.addEventListener("clipboardRender",function(data){
            var ob=data.detail;
            instance.renderClipboard(ob.component);
        });

    }

});
module.exports=Front;