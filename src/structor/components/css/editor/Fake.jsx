import React from 'react';
import {render} from 'react-dom';
import '../../../css/fake.css';

/**
 * 1.同时保存2份数据
 * 2.渲染一份数据
 *
 */
    var classes=['Object'];

var funcs=[
    'bind','map','replace','eval','toString','call'
    ];
var reserved=[
  'if','else','this','function','null','var','new'
];

var Fake=React.createClass({
    keyPressCb:function(event){
        var keycode=event.nativeEvent.keyCode;
        if(keycode==13)
            this.state.enter=true;
        else
            this.state.enter=false;
    },
    inputCb:function(event){

    },
    keyUpCb:function(event){
        var target=event.target;
        var value=event.target.value;
        var lreg=/\</g;
        var rreg=/\>/g;
        //value = value.replace('\n', '<br/>');
        //value = value.replace(lreg, '&lt;');
        //value = value.replace(rreg, '&gt;');
        var keycode=event.nativeEvent.keyCode;
        if(keycode==13)//enter key
        {
            value+=" ";
        }
        else if(keycode==8)//delete key
        {
            var lines = event.target.value.split('\n');
            var line=lines[lines.length-1];
            var enterReg=/\n$/;
            if(enterReg.exec(value))
            {
                event.target.value=event.target.value.substring(0,event.target.value.length);
            }
        }
        if(value!==null)
        {

            classes.map(function(item,i) {
                let reg=eval('/'+item+'/g');
                value=value.replace(reg,'<span style="color:#D02B9B">'+item+'</span>');
            });
            funcs.map(function(item,i) {
                let reg=eval('/'+item+'/g');
                value=value.replace(reg,'<span style="color:#D09C4A">'+item+'</span>');
            });
            reserved.map(function(item,i) {
                let reg = eval('/' + item + '/g');
                value=value.replace(reg,'<span style="color:#9F5621">'+item+'</span>');
            });
        }
        this.setState({data: value});
    },
    getInitialState:function()
    {

        //<span style={{color:"red"}}>a</span>
        //<div className="cursor highLight" ref="cursor"></div>
        return ({data: '','copy':''});
    },
    render:function(){
        var data=null;
        data=this.state.data+'<div style="background:#00f;display:inline-block;width:2px;height:16px"></div>';
         return (
            <div className="fake">
                <textarea onKeyUp={this.keyUpCb} onKeyPress={this.keyPressCb} onInput={this.inputCb}  spellCheck={false}></textarea>
                <div className="back" ref="back" >
                    <pre className="pre">
                        <div style={{display:"inline-block"}} dangerouslySetInnerHTML={{__html:data}}>
                        </div>
                    </pre>
                </div>
            </div>);

    },
    componentDidMount:function(){
        //var instance=this.refs.cursor;
        //var blink=function() {
        //    $(instance).toggleClass("highLight");
        //    setTimeout(blink, 500);
        //}
        //setTimeout(blink, 500);

    }
});
module.exports=Fake;