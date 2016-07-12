import React from 'react';
import {render} from 'react-dom';
import '../../../css/fake.css';





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
                event.target.value=event.target.value.substring(0,event.target.value.length-1);
            }
        }
        this.setState({data: value});
    },
    getInitialState:function()
    {

        //<span style={{color:"red"}}>a</span>
        //<div className="cursor highLight" ref="cursor"></div>
        return ({data: 'a'});
    },
    render:function(){
        var data=null;
        data=this.state.data;
         return (
            <div className="fake">
                <textarea onKeyUp={this.keyUpCb} onKeyPress={this.keyPressCb} onInput={this.inputCb}></textarea>
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