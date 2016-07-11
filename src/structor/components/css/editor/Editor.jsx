import React from 'react';
import {render} from 'react-dom';
import '../../../css/editor.css';


var Editor=React.createClass({
    clickCb:function(){
        this.setState({editing: true});
    },
    changeCb:function(evt){
        var target=evt.target;
        $(target).css("height",target.scrollHeight);
        this.setState({data: target.value});
    },
    saveCb:function(){
        var data=$(this.refs.editor).children("textarea")[0].value;
        console.log("data===\r\n" + data);
        this.setState({data: data, editing: false});
        if(this.props.saveHandle!==undefined&&this.props.saveHandle!==null)
        {
            this.props.saveHandle({data:data});
        }
    },
    getInitialState:function(){
        var data;
        if(this.props.data!==undefined&&this.props.data!==null)
            data=this.props.data;
        return ({editing: false,data:data});
    },
    render:function(){
        if(this.state.editing)
        {
            return (
                <div className="editor" ref='editor'>
                    <button onClick={this.saveCb}>save</button>
                    <textarea name="editor" value={this.state.data} onChange={this.changeCb} ref='textarea'/>
                </div>
            );
        }else{
            return (
                <div className="editor" ref='editor' onClick={this.clickCb}>
                    <pre>
                        {this.state.data}
                    </pre>
                </div>);
        }
    },
    componentDidUpdate:function(){
        var editor=this.refs.editor;
        var textarea=$(editor).children("textarea")[0];
        if(textarea!==undefined&&textarea!==null)
        {
            $(textarea).css("height", textarea.scrollHeight);
        }

    }
});
module.exports=Editor;