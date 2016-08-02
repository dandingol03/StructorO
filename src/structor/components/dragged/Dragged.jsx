import React from 'react';
import {render} from 'react-dom';
import Table from '../../../../framework/AppReact/components/basic/Table.jsx';
import CPanel from '../../../../framework/AppReact/components/basic/CPanel.jsx';
import Grid from '../../../../framework/AppReact/components/basic/Grid.jsx';
import Radio from '../../../../framework/AppReact/components/basic/Radio.jsx';
import Attention from '../../../../framework/AppReact/components/basic/Attention.jsx';
import Calendar from '../../../../framework/AppReact/components/basic/Calendar.jsx';
import Upload from '../../../../framework/AppReact/components/basic/Upload.jsx';
import Download from '../../../../framework/AppReact/components/basic/Download.jsx';
import Select from '../../../../framework/AppReact/components/basic/Select.jsx';
import Panel from '../../../../framework/AppReact/components/panel/Panel.jsx';
import Input from '../../../../framework/AppReact/components/basic/Input.jsx';
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
            event.dataTransfer.setData(this.state.type,
            JSON.stringify(
                {
                    type:this.state.type,
                    data:this.state.data
                }
            ));
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
                case 'Table':
                    ctrl=
                        <div draggable={true} onDragStart={this._dragStart} onDragEnd={this._dragEnd} onDrag={this.dragging}>
                            <Table {...ob}/>
                        </div>;
                    break;
                case 'CPanel':
                    ctrl=
                        <div draggable={true} onDragStart={this._dragStart} onDragEnd={this._dragEnd} onDrag={this.dragging}>
                            <CPanel {...ob}/>
                        </div>;
                    break;
                case 'Grid':
                    ctrl=
                        <div draggable={true} onDragStart={this._dragStart} onDragEnd={this._dragEnd} onDrag={this.dragging}>
                            <Grid {...ob}/>
                        </div>;
                    break;
                case 'Radio':
                    ctrl=
                        <div draggable={true} onDragStart={this._dragStart} onDragEnd={this._dragEnd} onDrag={this.dragging}>
                            <Radio {...ob}/>
                        </div>;
                    break;
                case 'Attention':
                    ctrl=
                        <div draggable={true} onDragStart={this._dragStart} onDragEnd={this._dragEnd} onDrag={this.dragging}>
                            <Attention {...ob}/>
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
                case 'Input':
                    ctrl=
                        <div draggable={true} onDragStart={this._dragStart} onDragEnd={this._dragEnd} onDrag={this.dragging}>
                            <Input {...ob}/>
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