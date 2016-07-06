import React from 'react';
import {render} from 'react-dom';
/**
 * radio
 * 1.增加默认选中 {label:'',value:'',checked:true}
 */


var Radio=React.createClass({
    changeCb:function(evt){
        var target=evt.target;
        var value=target.value;
        console.log("value===="+value);
    },
    render:function(){
        var radios;
        var props=this.props;
        if(this.props.data!==undefined&&this.props.data!==null)
        {
            var arr = null;
            if (Object.prototype.toString.call(props.data) == '[object Array]')
                arr = this.props.data;
            else
                arr = eval(this.props.data);
            radios=new Array();
            var changeCb=this.changeCb;
            arr.map(function (item, i) {
                var ra;
                if (item.checked == true || item.checked == "true")
                    ra = <input type="radio" value={item.value} name={props.ctrlName} defaultChecked
                                data-required={props.required}/>
                else
                    ra = <input type="radio" value={item.value} name={props.ctrlName}
                                data-required={props.required}/>
                radios.push(
                    <div style={{display:"inline"}} key={i}>
                        {ra}<span style={{margin:"0px 5px"}}>{item.label}</span>
                    </div>
                );
            });
        }
        return (
            <div>
                {radios}
            </div>
        )
    }
});
export default Radio;