import React from 'react';
import {render} from 'react-dom';
import CPanel from '../../../../framework/AppReact/components/basic/CPanel.jsx';
import Calendar from '../../../../framework/AppReact/components/basic/Calendar.jsx';
import Upload from '../../../../framework/AppReact/components/basic/Upload.jsx';
import Download from '../../../../framework/AppReact/components/basic/Download.jsx';
import Select from '../../../../framework/AppReact/components/basic/Select.jsx';
import Panel from '../../../../framework/AppReact/components/panel/Panel.jsx';
import OrdinaryTable from '../../../../framework/AppReact/components/forms/OrdinaryTable.jsx';
import PanelTable from '../../../../framework/AppReact/components/compounds/PanelTable.jsx';
import Input from '../../../../framework/AppReact/components/basic/Input.jsx';
import Query from '../../../../framework/AppReact/components/basic/Query.jsx';
import Note from '../../../../framework/AppReact/entrys/201513569/graduate/serviceHobby/modules/Note.jsx';
import ScaleBar from '../../../../framework/AppReact/components/basic/ScaleBar.jsx';
import Footer from '../../../../framework/AppReact/components/basic/Footer.jsx';
import Nav from '../../../../framework/AppReact/components/basic/Nav.jsx';
import HighLight from '../../../../framework/AppReact/components/basic/HighLight.jsx';
import '../../css/dragged.css';

var SyncStore=require('../flux/stores/SyncStore');
var SyncActions = require('../flux/actions/SyncActions');


var Dragged=React.createClass({
    dragging:function(event){
        SyncActions.move(event.clientX, event.clientY);
    },
    _onDraggedRender:function(mes){
        let ob=mes.detail;
        console.log('....');
        let type=ob.type;
        let data=ob.data;
        this.setState({ data: data,type:type});

    },
    _dragStart:function(event){

        if(this.state.type!==undefined&&this.state.type!==null) {
            let data=this.state.data;
            switch(this.state.type)
            {
                case 'ScaleBar':
                    delete data.className;
                    event.dataTransfer.setData(this.state.type,
                        JSON.stringify(
                            {
                                type:this.state.type,
                                data:data
                            }
                        ));
                    break;
                default:
                    event.dataTransfer.setData(this.state.type,
                        JSON.stringify(
                            {
                                type:this.state.type,
                                data:data
                            }
                        ));
                    break;
            }
        }

        setTimeout(function () {
            let dragged=this.refs.Dragged;
            var rect = $(dragged)[0].getBoundingClientRect();
            $(dragged).animate({left: -rect.width}, "slow");
            $(dragged).addClass("hide-in-left");
        }.bind(this),300);

        let rect=event.currentTarget.getBoundingClientRect();
        let dragged=
        {
            point:{x:event.clientX,y:event.clientY},
            offset:{x:event.clientX-rect.left,y:event.clientY-rect.top},
            width:rect.width,
            height:rect.height
        };
        SyncStore.setDragged(dragged);

    },
    _dragEnd:function(event){
        console.log('..end');
        let dom=this.refs.Dragged;
        
    },
    _onFolding:function(){
        if(this.state.data!==undefined&&this.state.data!==null) {
            let dragged=this.refs.Dragged;
            var rect = $(dragged)[0].getBoundingClientRect();
            $(dragged).animate({left: -rect.width}, "slow");
            $(dragged).addClass("hide-in-left");
        }
    },
    getInitialState:function(){
        return ({data: null,type:null});
    },
    render:function(){
        let ctrl=null;
        if(this.state.data!==undefined&&this.state.data!==null) {
            let ob={};
            for(var field in this.state.data) {
                ob[field] = this.state.data[field];
            }

            switch (this.state.type) {
                case 'CPanel':
                    ctrl=
                        <div draggable={true} onDragStart={this._dragStart} onDragEnd={this._dragEnd} onDrag={this.dragging}>
                            <CPanel {...ob}/>
                        </div>;
                    break;
                case 'Calendar':
                    ctrl=
                        <div draggable={true} onDragStart={this._dragStart} onDragEnd={this._dragEnd} onDrag={this.dragging}>
                            <Calendar {...ob}/>
                        </div>;
                    break;
                case 'Upload':
                    ctrl=
                        <div draggable={true} onDragStart={this._dragStart} onDragEnd={this._dragEnd} onDrag={this.dragging}>
                            <Upload {...ob}/>
                        </div>;
                    break;
                case 'Select':
                    ctrl=
                        <div draggable={true} onDragStart={this._dragStart} onDragEnd={this._dragEnd} onDrag={this.dragging}>
                            <Select {...ob}/>
                        </div>;
                    break;
                case 'Panel':
                    ctrl=
                        <div draggable={true} onDragStart={this._dragStart} onDragEnd={this._dragEnd} onDrag={this.dragging}>
                            <Panel {...ob}/>
                        </div>;
                    break;
                case "OrdinaryTable":
                    ctrl=
                        <div draggable={true} onDragStart={this._dragStart} onDragEnd={this._dragEnd} onDrag={this.dragging}>
                            <OrdinaryTable {...ob}/>
                        </div>;
                    break;
                case "PanelTable":
                    ctrl=
                        <div draggable={true} onDragStart={this._dragStart} onDragEnd={this._dragEnd} onDrag={this.dragging}>
                            <PanelTable {...ob}/>
                        </div>;
                    break;
                    break;
                case 'Input':
                    ctrl=
                        <div draggable={true} onDragStart={this._dragStart} onDragEnd={this._dragEnd} onDrag={this.dragging}>
                            <Input {...ob}/>
                        </div>;
                    break;
                case 'Query':
                    ctrl=
                        <div draggable={true} onDragStart={this._dragStart} onDragEnd={this._dragEnd} onDrag={this.dragging}>
                            <Query {...ob}/>
                        </div>;
                    break;
                case 'ScaleBar':
                    ctrl=
                        <div draggable={true} onDragStart={this._dragStart} onDragEnd={this._dragEnd} onDrag={this.dragging}>
                            <ScaleBar {...ob}/>
                        </div>;
                    break;
                case 'Note':
                    ctrl=
                        <div draggable={true} onDragStart={this._dragStart} onDragEnd={this._dragEnd} onDrag={this.dragging}>
                            <Note {...ob}/>
                        </div>;
                    break;
                case 'Footer':
                    ctrl=
                        <div draggable={true} onDragStart={this._dragStart} onDragEnd={this._dragEnd} onDrag={this.dragging}>
                            <Footer {...ob}/>
                        </div>;
                    break;
                case 'Nav':
                    ctrl=
                        <div draggable={true} onDragStart={this._dragStart} onDragEnd={this._dragEnd} onDrag={this.dragging}>
                            <Nav {...ob}/>
                        </div>;
                    break;
                case 'HighLight':
                    ctrl=
                        <div style={{padding:"20px"}} draggable={true} onDragStart={this._dragStart} onDragEnd={this._dragEnd} onDrag={this.dragging}>
                            <HighLight {...ob}/>
                        </div>;
                    break;
                default:
                    break;
            }
        }
        return (
            <div ref="Dragged" className="dragged" >
                    {ctrl}
            </div>
        );
    },
    componentWillUpdate:function(){
        let dragged=this.refs.Dragged;
    },
    componentDidUpdate:function(){
        let dragged=this.refs.Dragged;
        if(!$(dragged).hasClass('hide-in-left'))
        {
            //$(dragged).animate({left: '0%'},"slow");
            var rect = $(dragged)[0].getBoundingClientRect();
            $(dragged).css("left", -rect.width);
            $(dragged).addClass("hide-in-left");
        }
        $(dragged).animate({left: "0px"}, "slow");
        $(dragged).removeClass('hide-in-left');
    },
    componentDidMount:function(){
        var dom_node=$("#drag")[0];
        dom_node.addEventListener("draggedRender",this._onDraggedRender);
        SyncStore.addFoldingListener(this._onFolding);
    },
    componentWillMount:function(){
        var dom_node = $("#drag")[0];
    },
    componentWillUnmount:function(){
        var dom_node=$("#drag")[0];
        dom_node.removeEventListener("draggedRender",this._onDraggedRender);
        SyncStore.removeFoldingListener(this._onFolding);
    }
});
module.exports=Dragged;