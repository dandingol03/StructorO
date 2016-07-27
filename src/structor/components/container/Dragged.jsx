import React from 'react';
import {render} from 'react-dom';
import Table from '../../../../framework/AppReact/components/basic/Table.jsx';
import Panel from '../../../../framework/AppReact/components/basic/Panel.jsx';
import Grid from '../../../../framework/AppReact/components/basic/Grid.jsx';
import Radio from '../../../../framework/AppReact/components/basic/Radio.jsx';
import '../../css/dragged.css';

var SyncStore=require('../../../../framework/AppReact/flux/stores/SyncStore');

var Dragged=React.createClass({
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
                        <div draggable={true} onDragStart={this._dragStart}>
                            <Table {...ob}/>
                        </div>;
                    break;
                case 'Panel':
                    ctrl=
                        <div draggable={true} onDragStart={this._dragStart}>
                            <Panel {...ob}/>
                        </div>;
                    break;
                case 'Grid':
                    ctrl=
                        <div draggable={true} onDragStart={this._dragStart}>
                            <Grid {...ob}/>
                        </div>;
                    break;
                case 'Radio':
                    ctrl=
                        <div draggable={true} onDragStart={this._dragStart}>
                            <Radio {...ob}/>
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