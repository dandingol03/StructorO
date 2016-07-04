import React from 'react';
import {render} from 'react-dom';
import Table from '../../../../framework/AppReact/components/basic/Table.jsx';
import Components from '../../../../framework/AppReact/metadata/components.json';



var Container=React.createClass({
    backClick:function(){
        $("#preview").fadeOut();
    },
    renderClipboard:function(ob){
        $("#preview").fadeIn(1000);
        this.setState({clipboard: ob});
    },
    getInitialState:function(){
        return({clipboard:null});
    },
    render:function(){
        var ctrl=null;
        if(this.state.clipboard!==null&&this.state.clipboard!==undefined)
        {
            switch(this.state.clipboard)
            {
                case 'Table':
                    ctrl=<Table {...Components.Table}/>;
                    break;
                default:
                    break;
            }
        }

     return (
         <div>
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
module.exports=Container;