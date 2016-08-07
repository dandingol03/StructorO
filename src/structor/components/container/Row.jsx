import React from 'react';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import Select from '../../../../framework/AppReact/components/basic/Select.jsx';
import Input from '../../../../framework/AppReact/components/basic/Input.jsx';

import Shadow from '../decorator/Shadow.jsx';
import '../../css/row.css';

var SyncStore=require('../flux/stores/SyncStore');
var SyncActions = require('../flux/actions/SyncActions');
var nonCollisionP=/(^|\s)(shadow)($|\s)/;
/**
 * 1.Row支持拖拽
 * 2.Row组件保存自动生成配置插入panel.bean属性,并清除panel的data属性
 *
 */

var Row=React.createClass({
    _propertyCallback:function(mes){
        let ob=mes.detail;
        let _config=$("#_config")[0];
        _config.removeEventListener("config",this._propertyCallback);
    },
    propertyCb:function(index){
        console.log('index=' + index);
        if(index!==undefined&&index!==null&&!isNaN(parseInt(index)))
        {
            let node={};
            $.extend(true,node,this.state._nodes[index]);
            window.App.remodal.show({ctrlName:'stuType',label:'学生类型'});
            let _config=$("#_config")[0];
            _config.addEventListener("config",this._propertyCallback);
        }
    },
    getShadowInX:function(rect,dragged)
    {
        if(dragged.point.x>rect.left&&dragged.point.x<=((rect.left+rect.right)/2))
            return -1;
        else
            return 1;
    },
    xCollision:function(rect,dragged){
        return dragged.point.x >= rect.left && dragged.point.x <= rect.right;
    },
    yCollision:function(rect,dragged) {
        if(dragged.point.y >= rect.top && dragged.point.y <= rect.bottom)
        {
            return true;
        }
        else
            return false;
    },
    nodesToArray: function (nodes) {
        return Array.prototype.slice.call(nodes, 0);
    },
    collision:function(dragged,ctrls){
        if(ctrls.length==2)
        {
            console.log('...stop here');
        }
        for (var i = 0; i < ctrls.length; i += 1)
        {
            let rect=null;
            if(nonCollisionP.exec(ctrls[i].className))
            {
                 continue;
            }
            rect = ctrls[i].getBoundingClientRect();
            if(this.state.lock=="horizontal"&&rect!==null)
            {
                if(this.xCollision(rect, dragged)&&this.yCollision(rect,dragged))
                    return ctrls[i];
            }
        }
    },
    mouseOut:function(dragged,target){
        if(target.childNodes.length==2)
        {
            console.log('stop here');
        }
        var rect=target.getBoundingClientRect();
        if(!this.xCollision(rect,dragged)||!this.yCollision(rect,dragged))
        {
            return true;
        }
    },
    _move:function(){
        var dragged=SyncStore.getDragged();
        let row=this.refs.row;
        var ctrls=this.nodesToArray(row.childNodes);
        if(ctrls.length>0)
        {
            let nodes=[];
            var out = this.mouseOut(dragged, row);
            if(out)
            {
                if(this.state._nodes.length==2)
                {
                    console.log('stop here');
                }
                this.state._nodes.map(function(node,i) {
                    if(node.type!='Shadow')
                        nodes.push(node);
                });
                this.setState({_nodes: nodes});
                 return;
            }
            var collision = this.collision(dragged, ctrls);
            $.extend(true,nodes,this.state._nodes);
            let ob={type:'Shadow',data:{width:dragged.width,height:dragged.height}};
            if(collision)
            {
                var newIndex = ctrls.indexOf(collision);
                let news=[];
                if(this.state.lock=="horizontal")
                {
                    if(this.getShadowInX(ctrls[newIndex].getBoundingClientRect(),dragged)>0)//it should be deposited in the right side
                    {
                        newIndex++;

                    }else{
                        if(newIndex>0)
                            newIndex--;
                    }


                    if(this.state.previousIndex!==undefined&&this.state.previousIndex!==null&&!isNaN(parseInt(this.state.previousIndex)))
                    {


                        $.extend(true, news, nodes);
                        news.splice(newIndex,0,ob);
                        for(let i=0;i<news.length;i++)
                        {
                            if(news[i].type=='Shadow'&&i!=newIndex)
                            {
                                news.splice(i, 1);
                                break;
                            }
                        }
                        nodes=news;

                    }else//第一次进入拖拽区域
                    {}

                }

                this.setState({_nodes:nodes,previousIndex:newIndex});
            }
            else
            {}

        }
    },
    drop:function(event){
        event.stopPropagation();
        let target=event.currentTarget;
        let type = event.dataTransfer.types[0];
        let ob =event.dataTransfer.getData(type);
        if(Object.prototype.toString.call(ob)=='[object String]')
            ob = eval('(' + ob + ')');
        let nodes=[];
        $.extend(true,nodes,this.state._nodes);
        nodes.splice(this.state.previousIndex, 0, {type: ob.type, data: ob.data});
        let news=[];
        nodes.map(function(node,i) {
            if(node.type!='Shadow')
                news.push(node);
        });
        nodes=news;
        this.setState({_nodes: nodes});
        $(target).removeClass('highLight');
        $(target).addClass('default');
        //TODO:add row data to parent
        if(this.props.recall!==undefined&&this.props.recall!==null)
            this.props.recall(nodes);
    },
    dragOver:function(event) {
        event.preventDefault();
        let target=event.currentTarget;
        if($(target).hasClass('default'))
            $(target).removeClass('default');
        if(!$(target).hasClass('highLight'))
            $(target).addClass('highLight');
    },
    dragLeave:function(event) {
        console.log('leave');
        let target=event.currentTarget;
        if($(target).hasClass('highLight'))
            $(target).removeClass('highLight');
        if(!$(target).hasClass('default'))
            $(target).addClass('default');

    },
    _dragStart:function(event){

        let target=event.currentTarget;
        let row=this.refs.row;
        var ctrls=this.nodesToArray(row.childNodes);
        let index=ctrls.indexOf(target);
        let node=this.state._nodes[index];
        event.dataTransfer.setData(node.type,
            JSON.stringify(
                {
                    type:node.type,
                    data:node.data
                }
            ));
        setTimeout(function () {
            let nodes=this.state._nodes;
            nodes.splice(index, 1);
            this.setState({_nodes: nodes});
        }.bind(this), 300);

    },
    _dragEnd:function(event) {
        console.log('drag inner has been ended');
    },
    _dragging:function(event){
        SyncActions.move(event.clientX, event.clientY);
    },
    getInitialState:function(){
        let data=null;
        let nodes = [];
        if(this.props.data!==undefined&&this.props.data!==null) {
            if (Object.prototype.toString.call(this.props.data) == '[object Array]')
                nodes = this.props.data;
            else
                nodes.push(this.props.data);
        }


        return ({_nodes: nodes,lock:"horizontal"});
    },
    render:function(){

        let _nodes=[];
        let that=this;
        if(this.state._nodes.length>0) {
            this.state._nodes.map(function(node,i) {
                let ctrl=null;
                switch (node.type) {
                    case 'Select':

                        ctrl=
                            <div key={i} className="drag-wrapper" draggable={true} onDragStart={that._dragStart} >
                                <span>{node.data.label}</span>
                                <Select {...node.data} className="no-drag"/>
                                <span className="properties fa fa-cog" onClick={that.propertyCb.bind(that,i)}></span>
                            </div>;
                        break;
                    case 'Input':
                        ctrl=
                            <div key={i} className="drag-wrapper" draggable={true} onDragStart={that._dragStart}>
                                <span>{node.data.label}</span>
                                <Input {...node.data} className="no-drag"/>
                            </div>;
                        break;
                    case 'Shadow':
                        ctrl=<Shadow {...node.data} key={i}/>;
                        break;
                    default :
                        break;
                }
                if(ctrl)
                    _nodes.push(ctrl);
            });
        }
        return (
            <li className="row default" onDrop={this.drop} onDragOver={this.dragOver} onDragLeave={this.dragLeave} ref="row">
                {_nodes}
            </li>
        );
    },
    componentDidMount:function(){
        SyncStore.addMoveListener(this._move);
    },
    componentWillUnmount:function(){
        SyncStore.removeMoveListener(this._move);
    }
});
module.exports=Row;