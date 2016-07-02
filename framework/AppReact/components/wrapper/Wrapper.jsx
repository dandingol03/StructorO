import React from 'react';
import {render} from 'react-dom';
import '../../css/basic/wrapper.css';

var Wrapper=React.createClass({
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

        if(this.state.hover==true)
        {
            return (
                <div className="wrapper hover" ref="wrapper">
                    {borderCtrl}
                    {this.props.children}
                </div>
            )
        }else{
            return (
                <div className="wrapper" ref="wrapper">
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
    }
});
module.exports=Wrapper;