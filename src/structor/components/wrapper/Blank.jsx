import React from 'react';
import {render} from 'react-dom';
import '../../css/blank.css';
import CPanel from '../../../../framework/AppReact/components/basic/CPanel.jsx';
import Table from '../../../../framework/AppReact/components/basic/Table.jsx';
import Attention from '../../../../framework/AppReact/components/basic/Attention.jsx';
import Calendar from '../../../../framework/AppReact/components/basic/Calendar.jsx';
import Upload from '../../../../framework/AppReact/components/basic/Upload.jsx';
import Download from '../../../../framework/AppReact/components/basic/Download.jsx';
import Panel from '../../../../framework/AppReact/components/panel/Panel.jsx';
import OrdinaryTable from '../../../../framework/AppReact/components/forms/OrdinaryTable.jsx';
import PanelTable from '../../../../framework/AppReact/components/compounds/PanelTable.jsx';
import ScaleBar from '../../../../framework/AppReact/components/basic/ScaleBar.jsx';
import Note from '../../../../framework/AppReact/entrys/201513569/graduate/serviceHobby/modules/Note.jsx';
import Footer from '../../../../framework/AppReact/components/basic/Footer.jsx';
import Nav from '../../../../framework/AppReact/components/basic/Nav.jsx';

import Basic from '../container/Basic.jsx';
import RowsEditor from '../editor/RowsEditor.jsx';

var SyncStore=require('../flux/stores/SyncStore');
var SyncActions = require('../flux/actions/SyncActions');
var ProxyQ=require('../proxy/ProxyQ');


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
 * 4.Blank的重新渲染
 *      1>.当本组件的挂载组件数据与原先并无不同时,不进行重新渲染,以此设定原则
 *
 */



var QUOTE=222;
var Blank=React.createClass({
    _beanCallback:function(mes){
        let detail=mes.detail;
        let ob=
        {
            url:detail.url,
            params:
            {
                reactPageName:detail.reactPageName,
                reactActionName:detail.reactActionName
            }
        };
        console.log('.....ob is back');

        let old={};
        $.extend(true, old, this.state.data);
        if(old.data.bean!==undefined&&old.data.bean!==null)
        {
            old.data.bean = Object.assign(old.data.bean, ob);
        }
        else{
            old.data.bean=ob;
        }
        this.setState({data: old});
        var _config=$("#_config")[0];
        _config.removeEventListener("config",this._beanCallback);
    },
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
        let border_ctrl = this.refs["border-ctrl"];
        if($(border_ctrl).hasClass("hide"))
        {
            $(border_ctrl).removeClass("hide");
        }
        else{
            $(border_ctrl).addClass("hide");
        }

    },
    editCb:function(event) {

    },
    rowCb:function(event) {
        if(this.state.rowsEditable==true)
        {
            this.setState({rowsEditable: false});
        }
        else
        {
            this.setState({rowsEditable: true});

            let showEditor=function(){
                let blank=this.refs.blank;
                let editor=$(blank).find('.rows-editor-wrapper');
                if(editor.css("display")=="none")
                {
                    editor.slideDown();
                }
            }.bind(this);

            setTimeout(showEditor, 120);

        }
        event.stopPropagation();
    },
    beanCb:function(event)
    {
        let bean=this.state.data.data.bean;
        if(bean.params!==undefined&&bean.params!==null)
        window.App.remodal.show(
            {
                url:bean.url!==undefined&&bean.url!==null?bean.url:'/bsuims/reactPageDataRequest.do',
                reactActionName:bean.params.reactActionName!==undefined&&bean.params.reactActionName!==null?bean.params.reactActionName:'',
                reactPageName:bean.params.reactPageName!==undefined&&bean.params.reactPageName!==null?bean.params.reactPageName:''}
        );
        else{
            window.App.remodal.show(
                {
                    url:'/bsuims/reactPageDataRequest.do',
                    reactActionName:'',
                    reactPageName:''
                });
        }
        var _config=$("#_config")[0];
        _config.addEventListener("config",this._beanCallback);
        event.stopPropagation();
    },
    saveRowsCb:function(ob){
        if(Object.prototype.toString.call(ob)=='[object Array]'&&ob.length>0) {
            let metadata={};
            $.extend(true, metadata, this.state.data);
            metadata.data.data=null;
            if(Object.prototype.toString.call(ob)=='[object Array]')
            {
                if(metadata.data.bean!==undefined&&metadata.data.bean!==null)
                {
                    metadata.data.bean = Object.assign(metadata.data.bean,{rows:JSON.stringify(ob)});
                }
                else
                    metadata.data.bean = {rows:ob};
            }
            else
            {
                if(metadata.data.bean!==undefined&&metadata.data.bean!==null)
                {
                    metadata.data.bean=Object.assign(metadata.data.bean,ob);
                }
                metadata.data.bean=ob;
            }

            this.setState({data: metadata,rowsEditable:false});//clicked=false,收起RowsEditor的配置面板
        }
    },
    closeRowsCb:function(ob)
    {
        if(Object.prototype.toString.call(ob)=='[object Array]')
            this.state.rows=ob;
        this.setState({rowsEditable: false});
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
        var child=[];
        if(this.props.child!==undefined&&this.props.child!==null)
        {
            child=this.props.child;
        }
        return ({prefix: null, suffix: null,data:data,child:child,clicked:false,vector:vector});
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
        let rowsEditor=null;

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


            let helps=[];
            helps.push(
                <div className="selected-overlay-button selected-overlay-button-edit" key={0}>
                    <span className="fa fa-pencil" onClick={this.editCb}></span>
                </div>);

            helps.push(
                <div className="selected-overlay-button selected-overlay-button-copy-paste" key={1}>
                    <span className="fa fa-scissors" onClick={this.removeCb}></span>
                </div>
            );

            //加入row的拖拽模式
            if(this.state.data.data!==undefined&&this.state.data.data!==null)
                if(this.state.data.data.rowsEditable==true)
                {
                    helps.push(
                        <div className="selected-overlay-button selected-overlay-button-rows-edit" key={2}>
                            <span className="fa fa-list-ul" onClick={this.rowCb}></span>
                        </div>
                    );
                    helps.push(
                        <div className="selected-overlay-button selected-overlay-button-bean-edit" key={3}>
                            <span className="fa fa-exchange" onClick={this.beanCb}></span>
                        </div>
                    );
                }

            borderCtrl=
                <div className="border-ctrl hide" ref="border-ctrl">
                    {helps}
                </div>;



        if(this.state.rowsEditable==true) {
            rowsEditor=
                <div className="rows-editor-wrapper">
                   <RowsEditor saveRowsCb={this.saveRowsCb} rows={this.state.rows} closeRowsCb={this.closeRowsCb}/>
                </div>;
        }

        let self=null;
        if(this.state.data!==null&&this.state.data!==undefined) {
            switch (this.state.data.type) {
                case 'CPanel':
                    let inst=<CPanel/>;
                    if(Object.prototype.toString.call(inst.type.prototype.dropEnable)=='[object Function]'&&inst.type.prototype.dropEnable()==true)
                    {
                        self=
                            <div className="drop-wrapper" onDragOver={this.dragOver} onDrop={this.drop}>
                                <CPanel>
                                    {nodes}
                                </CPanel>
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
                case 'Table':
                    self=<Table {...this.state.data.data}/>;
                    break;
                case 'Attention':
                    self=<Attention {...this.state.data.data}/>;
                    break;
                case 'Calendar':
                    self=<Calendar {...this.state.data.data}/>;
                    break;
                case 'Upload':
                    self=<Upload {...this.state.data.data}/>;
                    break;
                case 'Download':
                    self=<Download {...this.state.data.data}/>;
                    break;
                case 'Panel':
                    self=<Panel {...this.state.data.data}/>;
                    break;
                case 'OrdinaryTable':
                    self=<OrdinaryTable {...this.state.data.data}/>;
                    break;
                case 'PanelTable':
                    self=<PanelTable {...this.state.data.data}/>;
                    break;
                case 'ScaleBar':
                    self=<ScaleBar {...this.state.data.data}/>;
                    break;
                case 'Note':
                    self=<Note {...this.state.data.data}/>;
                    break;
                case 'Footer':
                    self=<Footer {...this.state.data.data}/>;
                    break;
                case 'Nav':
                    self=<Nav {...this.state.data.data}/>;
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
                {rowsEditor}
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
    componentDidUpdate:function(){

    },
    componentWillUnmount:function(){
        let dom=this.refs.blank;
        dom.removeEventListener('mousedown', this.onMouseDown);
        document.removeEventListener('keydown',this.onKeyDown);
    }
});
module.exports=Blank;