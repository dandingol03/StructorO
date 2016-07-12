import React from 'react';
import {render} from 'react-dom';
import '../../../css/fake.css';


var Fake=React.createClass({
    keyPressCb:function(event){
        var keycode=event.nativeEvent.keyCode;
        console.log("value of textarea====\r\n" + event.target.value);
        console.log("keycode======\r\n" + keycode);

    },
    inputCb:function(event){
        console.log('.....');
        console.log('......');
        console.log("value when input =====\r\n" + event.target.value);
    },
    keyUpCb:function(event){
        var target=event.target;
        console.log("selectStart====\r\n" + event.target.selectionStart);
        console.log("value of textarea======\r\n" + event.target.value);
    },
    getInitialState:function()
    {
        return ({data: ''});
    },
    render:function(){

     return (
        <div className="fake">
            <textarea onKeyUp={this.keyUpCb} onKeyPress={this.keyPressCb} onInput={this.inputCb}></textarea>
            <div className="back" ref="back" >
                <span style={{color:"red"}}>a</span>
                <div className="cursor highLight" ref="cursor"></div>
            </div>
        </div>);

    },
    componentDidMount:function(){
        var instance=this.refs.cursor;
        var blink=function() {
            $(instance).toggleClass("highLight");
            setTimeout(blink, 500);
        }
        setTimeout(blink, 500);

    }
});
module.exports=Fake;