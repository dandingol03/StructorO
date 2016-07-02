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
                alert("response==="+response);
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
            var fields=new Array();
            for(var field in this.state.data[0])
            {
                fields.push(<td key={field}>{field}</td>);
            }

            this.state.data.map(function(item,i) {
                var tds=new Array();

                var k=0;
                for(var field in item)
                {
                    tds.push(<td key={k++}>{field}</td>);
                }
                trs.push(
                    <tr key={i}>
                        {tds}
                    </tr>
                );
            });

            return(
                <table className="table table-bordered center ordinaryTable" key={i}>
                    <tbody >
                    <tr>{fields}</tr>
                    {trs}
                    </tbody>
                </table>

            )
        }

    }
});
module.exports=Table;