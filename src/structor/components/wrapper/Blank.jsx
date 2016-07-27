import React from 'react';
import {render} from 'react-dom';
import '../../css/blank.css';
import Grid from '../../../../framework/AppReact/components/basic/Grid.jsx';
import Panel from '../../../../framework/AppReact/components/basic/Panel.jsx';
import Table from '../../../../framework/AppReact/components/basic/Table.jsx';
import Radio from '../../../../framework/AppReact/components/basic/Radio.jsx';
import Basic from '../container/Basic.jsx';


var SyncStore=require('../../../../framework/AppReact/flux/stores/SyncStore');
var SyncActions = require('../../../../framework/AppReact/flux/actions/SyncActions');
var ProxyQ=require('../../../../framework/AppReact/components/proxy/ProxyQ');


//同步所有组件的可放置状态
/**
 * 1.props
 *      1>vector,本组件在_tree中的哈希编码
 *
 * 2.todo
 *      1>.同布所有需要Blank渲染的组件的展开状态
 *
 * 3.function
 *      1>.onKeyDown,展开所有组件的可放置位置
 *
 *
 */



var QUOTE=222;
var Blank=React.createClass({
    onKeyDown:function(event){
        switch (event.keyCode)
        {
            case QUOTE:
                if(event.metaKey==true)
                {
                    console.log('......command+quote');
                    if(this.state.dragged!==true)
                        this.setState({dragged:true});
                    else
                        this.setState({dragged: false});
                }
                break;
            default:
                break;
        }
    },
    onMouseDown:function(event){
        SyncActions.folding();
    },
    clickCb:function(event){
        //阻止子组件的点击事件冒泡
        event.stopPropagation();
        this.setState({clicked: true});
    },
    editCb:function(event) {

    },
    syncWithStore:function(vector,type,ob,callback){
        if(type!==undefined&&type!==null)
        {
            switch (type) {
                case 'create':
                    SyncActions.drop(vector, ob, callback);
                    break;
                case 'remove':
                    SyncActions.remove(vector, callback);
                    break;
                default:
                    break;
            }
        }
    },
    removeCb:function(vector) {
        if(this.props.vector!==undefined&&this.props.vector!==null)
        {
            this.props.removeHandle(this.props.vector)
        }else{
            this.syncWithStore(vector,'remove',null,function(parent){
                let _nodes=[];
                for(var index in parent) {
                    if(isNaN(parseInt(index)))
                        continue;
                    _nodes.push(parent[index]);
                }
                this.setState({child: _nodes});
            }.bind(this));
        }
    },
    dragEnter:function(event){
        let target=event.currentTarget;
        let classname=$(target).attr('class');
        console.log('....it is dragEnter');
        switch (classname) {
            case 'prefix':
            case 'suffix':
                $(target).addClass('highLight');
                break;
            default:
                break;
        }
    },
    dragLeave:function(event){
        let target=event.currentTarget;
        if($(target).hasClass('highLight'))
            $(target).removeClass('highLight');
    },
    dragOver:function(event) {
        event.preventDefault();
        let target=event.currentTarget;
        if($(target).hasClass('drop-wrapper'))
            return ;
        if(!$(target).hasClass('highLight'))
            $(target).addClass('highLight');
    },
    drop:function(event,index){
        //var data =event.dataTransfer.getData('A');
        let ev=null;
        let pos=null;
        if(index!==null&&index!==undefined)
        {
            ev = index;
            pos=event;
        }
        else
            ev=event;
        ev.stopPropagation();
        let target=ev.currentTarget;
        let type = ev.dataTransfer.types[0];
        let data =ev.dataTransfer.getData(type);
        if(Object.prototype.toString.call(data)=='[object String]')
            data = eval('(' + data + ')');
        if($(target).hasClass('drop-wrapper')) {
            //this.state.child.push(data);
            //this.setState({child: this.state.child});
            let ob={index:this.state.child.length,data:data.data,type:data.type};
            this.syncWithStore(this.props.vector,'create', ob,function(parent){
                let _nodes=[];
                for(var index in parent) {
                    if(isNaN(parseInt(index)))
                        continue;
                    _nodes.push(parent[index]);
                }
                this.setState({child: _nodes});
            }.bind(this));
        }else if(pos!==null) {
            if($(target).hasClass('prefix'))
            {
                if(this.props.dropHandle!==undefined&&this.props.dropHandle!==null)
                {
                    var vector= [] ;
                    $.extend(true,vector,this.props.vector);
                    if(vector.length==1)
                        vector=null;
                    else{
                        vector.splice(vector.length - 1, 1);
                    }
                    this.props.dropHandle(vector,pos , data);
                }

            }else if($(target).hasClass('suffix'))
            {
                if(this.props.dropHandle!==undefined&&this.props.dropHandle!==null)
                {
                    var vector=[];
                    var vector=$.extend(true,vector,this.props.vector);
                    if(vector.length==1)
                        vector=null;
                    else{
                        $.extend(true,vector,this.props.vector);
                        vector.splice(vector.length - 1, 1);
                    }
                    this.props.dropHandle(vector,pos + 1, data);
                }
            }else
            {
                return;
            }
            this.setState({dragged:false});
        }else{}
    },
    dropHandle:function(vector,pos,data) {
        //this.state.child.splice(pos, 0, data);
        //this.setState({child: this.state.child});
        let ob = {index: pos, type:data.type,data: data.data};
        this.syncWithStore(vector,'create', ob,function(parent){
            let _nodes=[];
            for(var index in parent) {
                if(isNaN(parseInt(index)))
                    continue;
                _nodes.push(parent[index]);
            }
            this.setState({child: _nodes});
        }.bind(this));
    },
    getInitialState:function(){
        var data;
        if(this.props.data!==undefined&&this.props.data!==null) {
            data=this.props.data;
        }
        var vector=null;
        if(this.props.vector!==undefined&&this.props.vector!==null) {
            vector=this.props.vector;
        }
        return ({prefix: null, suffix: null,data:data,child:[],clicked:false,vector:vector});
    },
    componentWillReceiveProps:function(props){
        let ob={};
        if(props.data!==this.props.data)
            ob.data=props.data;
        this.setState(ob);
    },
    render:function(){

        let prefix=null;
        let suffix=null;
        let nodes=null;
        let borderCtrl=null;

        if(this.state.dragged==true&&this.props.dropHandle!==undefined&&this.props.dropHandle!==null)
        {
            prefix=  <div className="prefix"
                          onDragOver={this.dragOver}
                          onDragLeave={this.dragLeave}
                          onDrop={this.drop.bind(this,this.props.index)}>
                <div>deposite here</div>
            </div>;
            suffix=<div className="suffix"
                        onDrop={this.drop.bind(this,this.props.index)}>
                <div>deposite here</div>
            </div>;
        }

        if(this.state.child.length>0)
        {
            nodes=[];
            let that=this;
            this.state.child.map(function(node,i) {
                let ctrl=null;
                if(node.type!==undefined&&node.type!==null&&node.type!='')
                {
                    ctrl=
                        <Blank key={i} data={node} dropHandle={that.dropHandle} removeHandle={that.removeCb} index={i} vector={node.vector}>
                        </Blank>;
                }

                if(ctrl)
                    nodes.push(ctrl);
            });
        }

        if(this.state.clicked==true) {
            borderCtrl=
                <div className="border-ctrl">
                    <div className="selected-overlay-button selected-overlay-button-edit">
                        <span className="fa fa-pencil" onClick={this.editCb}></span>
                    </div>
                    <div className="selected-overlay-button selected-overlay-button-copy-paste">
                        <span className="fa fa-scissors" onClick={this.removeCb}></span>
                    </div>
                </div>;
        }

        let self=null;
        if(this.state.data!==null&&this.state.data!==undefined) {
            switch (this.state.data.type) {
                case 'Panel':
                    let inst=<Panel/>;
                    if(Object.prototype.toString.call(inst.type.prototype.dropEnable)=='[object Function]'&&inst.type.prototype.dropEnable()==true)
                    {
                        self=
                            <div className="drop-wrapper" onDragOver={this.dragOver} onDrop={this.drop}>
                                <Panel>
                                    {nodes}
                                </Panel>
                            </div>;
                    }
                    break;
                case 'Basic':
                    self=
                        <div className="drop-wrapper" onDragOver={this.dragOver} onDrop={this.drop}>
                            <Basic>
                                {nodes}
                            </Basic>
                        </div>;
                    break;
                case 'Radio':
                    self=<Radio>
                        </Radio>;
                    break;
                case 'Grid':
                    self=<Grid {...this.state.data.data}/>;
                    break;
                case 'Table':
                    self=<Table {...this.state.data.data}/>;
                    break;
                default:
                    break;
            }
        }

        return(
            <div onClick={this.clickCb} className="blank" ref="blank">
                {prefix}
                {self}
                {borderCtrl}
                {suffix}
                <span style={{display:"block",height:"20px"}}></span>
            </div>
        );
    },
    componentDidMount:function(){
        document.addEventListener('keydown',this.onKeyDown);
        let dom=this.refs.blank;
        dom.addEventListener('mousedown', this.onMouseDown);
    },
    componentWillUnmount:function(){
        let dom=this.refs.blank;
        dom.removeEventListener('mousedown', this.onMouseDown);
        document.removeEventListener('keydown',this.onKeyDown);
    }
});
module.exports=Blank;