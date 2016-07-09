import React from 'react';
import {render} from 'react-dom';
import '../../css/wrapper.css';
import Grid from '../../../../framework/AppReact/components/basic/Grid.jsx';
import Panel from '../../../../framework/AppReact/components/basic/Panel.jsx';
import Table from '../../../../framework/AppReact/components/basic/Table.jsx';
import Radio from '../../../../framework/AppReact/components/basic/Radio.jsx';


var SyncStore=require('../../../../framework/AppReact/flux/stores/SyncStore');
var SyncActions = require('../../../../framework/AppReact/flux/actions/SyncActions');
var ProxyQ=require('../../../../framework/AppReact/components/proxy/ProxyQ');
/**
 * 1.removeCb:组件的移除上升到父结点进行
 * 2.clipboard:
 * 3.cancelCb:取消业务待做
 * 4.nesting提取本组件的innerHtml,发送CSS.jsx进行显示和编辑
 * 5.typeof state._nodes =='[object Object]'
 *  1>._nodes.ob    自身结点所携带的数据
 *  2>._nodes.count  自身结点所拥有的子结点数量
 *  3>._nodes.[int]  自身所携带的子结点皆以0~n作为key
 */


var Wrapper=React.createClass({
    nesting:function(dom,pre){
        var str = '';
        str +=   '<' + dom.tagName.toLowerCase();
        var props = dom.attributes;
        for (var i = 0; i < props.length; i++) {
            var prop = props[i].name;
            str += ' ' + prop + '=' + '\"'
            if(prop=="class")
            {
                var classList=dom.classList;
                for(var i=0;i<classList.length;i++)
                {
                    str+=classList[i];
                    if(i!=classList.length-1)
                        str+=" ";
                }
            }
            else if(Object.prototype.toString.call(dom[prop])=='[object CSSStyleDeclaration]')
            {
                for(var cssProp in dom[prop])
                {
                    if(isNaN(parseInt(cssProp))==true)
                        continue;
                    var styleProp=dom[prop][cssProp];
                    str+=styleProp+":"+dom[prop][styleProp]+";";
                }
            }
            else if(Object.prototype.toString.call(dom[prop])=='[object Function]')
            {
                var funcReg=/function(.*?)\(.*?\{([\s|\S]*?)\}/;
                var re=funcReg.exec(dom[prop]+'');
                str+=re[2].replace(/\s/g,'');
            }
            else if( /data-(.*)/.exec(prop))
            {
                str+=dom.dataset[/data-(.*)/.exec(prop)[1]];
            }
            else{
                str+= dom[prop];
            }
            str+='\"';
            console.log('...');
        }

        str += '>\r\n';
        for (var i = 0; i < dom.childNodes.length; i++) {
            var node = dom.childNodes[i];
            if (node.nodeType == 1)//元素
            {
                str += pre+'    '+  this.nesting(node,pre+'    ');
            }
            if (node.nodeType == 3)//文本
            {
                str += pre+'    '+ node.nodeValue + "\r\n";
            }
        }
        str += pre+'</' + dom.tagName.toLowerCase() + '>\r\n';
        return str;

    },
    cssCb:function(){

        var wrapper=this.refs.wrapper;
        //format innerHtml
        var str=this.nesting(wrapper,'');
        SyncActions.format(str);
    },
    removeCb:function(){
       if(this.props.invokeRemove!==undefined&&this.props.invokeRemove!==null)
        this.props.invokeRemove(this.state.vector);
    },
    invokeRemove:function(vector){
        SyncActions.remove(vector,function(_nodes){
            this.setState({_nodes:_nodes});
        }.bind(this));
    },
    /**
     * @function createCb,当用户完成粘贴行为时由SyncStore执行的回调
     *
     */
    createCb:function(){
        SyncActions.create(this.props.vector,function(ob){
            //TODO:更改数据
            this.setState({_nodes:ob});
        }.bind(this));
    },
    editCb:function(){
        if(this.state.vector==null||this.state.vector==undefined)
            return;
        var ob=SyncStore.getNode(this.state.vector);
        SyncActions.edit(ob,function(props)
        {
            this.setState(props);
        }.bind(this));
    },
    clickCb:function(evt){
        var target=evt.target;
        this.setState({clicked:true});
        if(this.props.cancelCb!==undefined&&this.props.cancelCb!==null)
            this.props.cancelCb();
    },
    cancelCb:function(){
        this.setState({clicked:false});
    },
    getInitialState:function(){
        var vector;
        if(this.props.vector!==null&&this.props.vector!==undefined)
            vector=this.props.vector;
        return ({hover:false,clicked:false,vector:vector,_nodes:null});
    },
    render:function(){
        var borderCtrl=null;
        if(this.state.clicked==true)
        {
            borderCtrl=
                <div style={{display: "flex", flexDirection: "row", position: "absolute", left: "2px", bottom: "2px"}}>
                    <div className="selected-overlay-button selected-overlay-button-quick-add-new">
                        <span className="fa fa-code" onClick={this.cssCb}></span>
                    </div>
                    <div className="selected-overlay-button selected-overlay-button-edit">
                        <span className="fa fa-pencil" onClick={this.editCb}></span>
                    </div>
                    <div className="selected-overlay-button selected-overlay-button-copy-paste">
                        <span className="fa fa-scissors" onClick={this.removeCb}></span>
                    </div>
                    <div className="selected-overlay-button selected-overlay-button-before-after">
                        <span className="fa fa-file-text" onClick={this.createCb}></span>
                    </div>
                </div>;
        }

        var nodes=null;
        var me=null;
        if(this.state._nodes!==undefined&&this.state._nodes!==null)
        {
            nodes=new Array();
            var invokeRemove=this.invokeRemove;
            var k=0;
            var state=this.state;
            //渲染子结点
            for(var index in this.state._nodes)
            {
                if(isNaN(index))
                    continue;
                var ctrl=null;
                var item=state._nodes[index];
                switch(item.ob.type)
                {
                    case 'Table':
                        ctrl=<Table  {...item.ob.data}/>;
                        break;
                    case 'Grid':
                        ctrl=<Grid {...item.ob.data}/>;
                        break;
                    case 'Panel':
                        ctrl=<Panel {...item.ob.data}/>;
                        break;
                    case 'Radio':
                        ctrl=<Radio {...item.ob.data}/>;
                        break;
                    default:
                        break;
                }
                nodes.push( <Wrapper vector={item.vector} cancelCb={this.cancelCb} key={k++} invokeRemove={invokeRemove}>
                    {ctrl}
                </Wrapper>);
            }

            //渲染自身
            switch (this.state._nodes.ob.type) {
                case 'Table':
                    me=<Table  {...item.ob.data}>
                        {nodes}
                        </Table>;
                    break;
                case 'Grid':
                    me=<Grid {...item.ob.data}>
                        {nodes}
                        </Grid>;
                    break;
                case 'Panel':
                    me=<Panel {...item.ob.data}>
                        {nodes}
                        </Panel>;
                    break;
                case 'Radio':
                    me=<Radio {...item.ob.data}>
                        {nodes}
                        </Radio>;
                    break;
                default:
                    break;
            }


        }
        if(this.state.hover==true)
        {
            return (
                <div className="wrapper hover" ref="wrapper" >
                    {me}
                    {borderCtrl}
                    {this.props.children}
                </div>
            )
        }else{
            return (
                <div className="wrapper" ref="wrapper">
                    <div>
                        {me}
                    </div>
                    {borderCtrl}
                    {this.props.children}
                </div>
            )
        }
    },
    componentDidMount:function(){
        var wrapper=this.refs.wrapper;
        var $wrapper=$(wrapper);
        var instance=this;
        $wrapper.hover(
            function(){
                instance.setState({hover: true});
            }.bind(instance),function(){
                instance.setState({hover: false});
            }.bind(instance));
        $wrapper.click(function(evt){
            instance.clickCb(evt);
        }.bind(instance));

    }
});
module.exports=Wrapper;