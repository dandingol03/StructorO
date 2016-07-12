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
        var dom=document.createElement('div');
        dom.innerHTML=target.value;
        evt.target.innerHTML=dom.innerHTML;
        //this.setState({data: target.value});
    },
    keyUpCb:function(evt){
        var target=evt.target;
        if(evt.keyCode==13) {//enter key
            let start= target.selectionStart;
            let k=0;
            let cv=target.value.substring(0,start);
            let index=cv.split('\n').length-2;
            let currentLine = cv.split('\n')[index];
            let quoteReg=/\{$/;
            let quoteRe = quoteReg.exec(currentLine);
            let reg=/^(\s*).*/;
            let re=reg.exec(currentLine);
            if(re!==null) {
                console.log("space count====" + re[1].length);
                for(let i=0;i<re[1].length;i++)
                {
                    target.value+=' ';
                }
            }
            if(quoteRe!==null) {//添加内置内容
                target.value+='  \n}';
                target.selectionStart=target.value.length-2;
                target.selectionEnd=target.value.length-2;
            }
        }
        else if(evt.keyCode==8) {//delete key
            let start= target.selectionStart;
            let cv=target.value.substring(0,start);
            let index=cv.split('\n').length-1;
            let currentLine = cv.split('\n')[index];
            let blankReg=/^\s*$/;
            let reg=/^(\s*).*/;
            let re=reg.exec(currentLine);
            let blank=blankReg.exec(currentLine);
            if(blank!==null) {//空行
                let prefixQuote=/\{$/;
                let suffixQuote=/^\}/;
                let prefixContent=null;
                let suffixContent=null;
                if(index>0)
                    prefixContent=cv.split('\n')[index-1];
                if(index<target.value.split('\n').length-1)
                    suffixContent=target.value.split('\n')[index+1];
                if(prefixContent!==null&&suffixContent!==null)
                {
                    let start=target.selectionStart;
                    let end=target.selectionEnd;
                    if(prefixQuote.exec(prefixContent)!==null&&suffixQuote.exec(suffixContent)!==null) {
                        target.value = target.value.substring(0, target.selectionStart - re[1].length-2) +
                            target.value.substring(target.selectionStart+2, target.value.length);
                        //TODO:change the selectionStart & selectionEnd
                        target.selectionStart=start-re[1].length-2;
                        target.selectionEnd=target.selectionStart;
                    }
                }else if(prefixContent==null)//首行删除
                {
                    if(target.selectionStart==0&&target.selectionEnd==0) {
                    }
                    else{
                        target.value = target.value.substring(0, target.selectionStart -1) +
                            target.value.substring(target.selectionStart+1, target.value.length);
                        target.selectionStart=0;
                        target.selectionEnd=0;
                    }
                }
            }
        }
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
                    <textarea name="editor" onChange={this.changeCb} onKeyUp={this.keyUpCb} ref='textarea'/>
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