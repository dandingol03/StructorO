import React from 'react';
import {render} from 'react-dom';
import '../../css/basic/table.css';
var ProxyQ=require('../proxy/ProxyQ');


var Table=React.createClass({
    fetch:function(){

        ProxyQ.queryHandle(
            null,
            this.props.query.url,
            this.props.query.params,
            'json',
            function(response){
                var data;
                var ob=new Object();
                if(Object.prototype.toString.call(response)!='[object Array]')
                    if(response.arr!==undefined&&response.arr!==null)
                        if(Object.prototype.toString.call(response.arr)=='[object Array]')
                            data=response.arr;
                        else
                            data=response;
                else
                    data=response.data;
                if(data!==undefined&&data!==null)
                    ob.data=data;
                ob.data$initialed=true;
                this.setState(ob);
            }.bind(this)
        )
    },
    getInitialState:function(){

        var data;
        var data$initialed;
        if(this.props.data!==undefined&&this.props.data!==null)
        {
            data=this.props.data;
            data$initialed=true;
        }
        var auto;
        if(this.props.auto!==undefined&&this.props.auto!==null)
            auto=this.props.auto;
        else
            auto=false;
        return({data:data,data$initialed:data$initialed,auto:auto});
    },
    render:function(){
        if(this.state.data$initialed!==true&&(this.props.data==null||this.props.data==undefined)) {
            console.log("auto======" + this.state.auto);
            if (this.state.auto == true)
                this.fetch();
            return (
                <table>
                </table>
            )
        }
        else{
            var trs=new Array();
            var k=0;
            var state=this.state;
            this.props.filterField.map(function(field,i) {
                if(state.data[field]!==undefined&&state.data[field]!==null)
                {
                    trs.push(
                        <tr key={i}>
                            <td key={0}>{field}</td>
                            <td key={1}>{state.data[field]}</td>
                        </tr>);
                }
            });

            return(
                <table className="table table-bordered center ordinaryTable" style={{marginBottom:"0px"}}>
                    <tbody >
                    {trs}
                    </tbody>
                </table>

            )
        }

    }
});
module.exports=Table;