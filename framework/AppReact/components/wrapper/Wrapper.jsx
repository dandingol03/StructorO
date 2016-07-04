import React from 'react';
import {render} from 'react-dom';
import '../../css/basic/wrapper.css';

var Wrapper=React.createClass({
    renderClipboard:function(ob){
        $("#preview").fadeIn(1000);
        this.setState({clipboard: ob});
    },
    getInitialState:function(){
        return ({hover:false,clicked:false});
    },
    render:function(){
        var borderCtrl=null;
        if(this.state.clicked==true)
        {
            borderCtrl=
                <div style={{display: "flex", flexDirection: "row", position: "absolute", left: "2px", bottom: "2px"}}>
                    <div className="selected-overlay-button selected-overlay-button-quick-add-new">
                        <span className="fa fa-plus"></span>
                    </div>
                    <div className="selected-overlay-button selected-overlay-button-edit">
                        <span className="fa fa-pencil"></span>
                    </div>
                    <div className="selected-overlay-button selected-overlay-button-copy-paste">
                        <span className="fa fa-scissors"></span>
                    </div>
                    <div className="selected-overlay-button selected-overlay-button-before-after">
                        <span className="fa fa-file-text"></span>
                    </div>
                </div>;
        }
        var clipboard=null;
        if(this.state.clipboard!==undefined&&this.state.clipboard!==null)
            clipboard=this.state.clipboard;
        if(this.state.hover==true)
        {
            return (
                <div className="wrapper hover" ref="wrapper">
                    <div>
                        {clipboard}
                    </div>
                    {borderCtrl}
                    {this.props.children}
                </div>
            )
        }else{
            return (
                <div className="wrapper" ref="wrapper">
                    <div>
                        {clipboard}
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
        $wrapper.click(function(){
            instance.setState({clicked:true});
        }.bind(instance));

        //监听window属性变化
        var dom_node=$("#clipboard")[0];
        dom_node.addEventListener("clipboardRender",function(data){
            var ob=data.detail;
            instance.renderClipboard(ob.component);
        });
    }
});
module.exports=Wrapper;