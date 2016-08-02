import React from 'react';
import {render} from 'react-dom';
import Table from '../../../../framework/AppReact/components/basic/Table.jsx';
import CPanel from '../../../../framework/AppReact/components/basic/CPanel.jsx';
import Grid from '../../../../framework/AppReact/components/basic/Grid.jsx';
import Radio from '../../../../framework/AppReact/components/basic/Radio.jsx';
import '../../css/front.css';


var  Components =require( '../../../../framework/AppReact/metadata/components.json');
var SyncStore=require('../../../../framework/AppReact/flux/stores/SyncStore');
var SyncActions = require('../../../../framework/AppReact/flux/actions/SyncActions');




var Front=React.createClass({
    _onClipboardRender:function(data){
        var ob=data.detail;
        this.renderClipboard(ob.component);
    },
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
                case 'CPanel':
                    ctrl=<CPanel {...Components.CPanel}/>;
                    break;
                case 'Grid':
                    ctrl=<Grid {...Components.Grid}/>;
                    break;
                case 'Radio':
                    ctrl=<Radio {...Components.Radio}/>;
                    break;
                default:
                    break;
            }
        }

        return (
            <div className="front">
                <button onClick={this.saveClick}>
                    save to clipboard
                </button>
                <button style={{position:"absolute",right:"20px",top:"20px"}} onClick={this.backClick}>
                    close me
                </button>
                <div style={{marginTop:"20px"}}>
                    {ctrl}
                </div>

            </div>);
    },
    componentDidMount:function(){
        var dom_node=$("#clipboard")[0];
        dom_node.addEventListener("clipboardRender",this._onClipboardRender);
    },
    componentWillUnmount:function(){
        var dom_node=$("#clipboard")[0];
        dom_node.removeEventListener("clipboardRender",this._onClipboardRender);
    }

});
module.exports=Front;