import React from 'react';
import {render} from 'react-dom';
import A from './A.jsx';
import B from './B.jsx';
import C from './C.jsx';
import './css/blank.css';



//同步所有组件的可放置状态

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
            this.state.child.push(data);
            this.setState({child: this.state.child});
        }else if(pos!==null) {
            if($(target).hasClass('prefix'))
            {
                if(this.props.dropHandle!==undefined&&this.props.dropHandle!==null)
                    this.props.dropHandle(pos , data);
            }else if($(target).hasClass('suffix'))
            {
                if(this.props.dropHandle!==undefined&&this.props.dropHandle!==null)
                    this.props.dropHandle(pos + 1, data);
            }else
            {
                return;
            }
            this.setState({dragged:false});
        }else{}
    },
    dropHandle:function(pos,data) {
        this.state.child.splice(pos, 0, data);
        this.setState({child: this.state.child});
    },
    getInitialState:function(){
        var data;
        if(this.props.data!==undefined&&this.props.data!==null) {
            data=this.props.data;
        }
        return ({prefix: null, suffix: null,data:data,child:[]});
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
                switch (node.type) {
                    case 'A':
                        ctrl=
                        <Blank key={i} data={node} dropHandle={that.dropHandle} index={i}>
                        </Blank>;
                        break;
                    case 'B':
                        ctrl=
                            <Blank key={i} data={node} dropHandle={that.dropHandle} index={i}>
                            </Blank>;
                        break;
                    case 'C':
                        ctrl=
                            <Blank key={i} data={node} dropHandle={that.dropHandle} index={i}>
                            </Blank>;
                        break;
                    default:
                        break;
                }
                if(ctrl)
                    nodes.push(ctrl);
            });
        }

        let self=null;
        if(this.state.data!==null&&this.state.data!==undefined) {
            switch (this.state.data.type) {
                case 'B':
                    let inst=<B/>;
                    if(Object.prototype.toString.call(inst.type.prototype.dropEnable)=='[object Function]'&&inst.type.prototype.dropEnable()==true)
                    {
                        self=<div className="drop-wrapper" onDragOver={this.dragOver} onDrop={this.drop}>
                            <B >
                                {nodes}
                            </B>
                            </div>
                    }
                    else
                        self=<B>
                            {nodes}
                            </B>;
                    break;
                case 'A':
                    self=<A>
                        {nodes}
                        </A>;
                    break;
                case 'C':
                    self=<C>
                        {nodes}
                        </C>;
                default:
                    break;
            }
        }

        return(
            <div>
                {prefix}
                {self}
                {suffix}
            </div>
        );
    },
    componentDidMount:function(){
        document.addEventListener('keydown',this.onKeyDown);
    },
    componentWillUnmount:function(){
        document.removeEventListener('keydown',this.onKeyDown);
    }
});
module.exports=Blank;