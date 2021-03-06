import React from 'react';
import {render} from 'react-dom';
import '../../css/basic/select.css';

/**
 * 1.select组件扩展父组件,实现选中触发事务提交
 * 2.example:
 *      <Select data=[{label:'name',value:'dnding'},{label:'name',value:'vergile'},{label:'name',value:'fantastin'}]/>
 */

var Select=React.createClass({
    selectCb:function(evt){
        console.log('...select callback');
        var target=evt.target;
        var hidden=this.refs.hidden_field;
        hidden.value=target.value;
        if(this.props.selectCb!==null&&this.props.selectCb!==undefined)
        {
            this.props.selectCb(target.value);
        }
    },
    getInitialState:function(){
        var data;
        if(this.props.data!==undefined&&this.props.data!==null)
        {
            data=this.props.data;
        }
        var data$initialed;
        if(data!==undefined&&data!==null)
        {
            data$initialed=true;
        }
        else
            data$initialed=false;
       return({selectedIndex:-1,data$initialed:data$initialed,data:data});
    },
    componentWillReceiveProps(props){
        var ob=new Object();
        if(props.data!==this.state.data) {
            ob.data=props.data;
        }
        if(this.state.data$initialed==false)
        {
            ob.data$initialed=true;
        }
        if(props.disabled!==undefined&&props.disabled!==null)
            ob.disabled=props.disabled;
        this.setState(ob);

    },
    render:function(){
     if(this.state.data$initialed==true&&Object.prototype.toString.call(this.state.data)=='[object Array]'&&this.state.disabled!=true
            &&this.props.ctrlName!==undefined&&this.props.ctrlName!==null)
     {
         var options=new Array();
         var selectCb=this.selectCb;
         var selected = null;

         let defaultValue=null;
         let ctrlName=null;
         if(this.props.ctrlName!==undefined&&this.props.ctrlName!==null)
         {
             if(this.props.ctrlName.indexOf('=>')!=-1)
                ctrlName=this.props.ctrlName.split('=>')[0];
             else
                ctrlName=this.props.ctrlName;
         }


         this.state.data.map(function(item,i) {
             if(item["selected"]!==undefined&&item["selected"]!==null)
             {
                 defaultValue=item.value;
                 options.push(<option value={item.value} key={i}>{item.label}</option>);
                 if(item.value!==undefined&&item.value!==null)
                    selected=item.value;
             }
             else
                options.push(<option value={item.value} key={i}>{item.label}</option>);
         });
         if(defaultValue==null)
         {
             defaultValue=this.state.data[0].value;
             selected=defaultValue;
         }
        return(
            <div className={"select "+(this.props.className!==undefined&&this.props.className!==null?this.props.className:"")}>
                <input name={ctrlName} style={{display:"none"}}
                       defaultValue={selected!==null&&selected!==undefined?selected:''}
                       ref="hidden_field"/>
                <select onChange={selectCb} style={{width:"100%"}}
                        data-query={this.props["data-query"]!==null&&this.props["data-query"]!==undefined?this.props["data-query"]:null}
                        defaultValue={defaultValue}>
                    {options}
                </select>
            </div>
        );
     }
     else{
         return(<select ></select>);
     }


    }
});
export default Select;
