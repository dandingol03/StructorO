import React from 'react';
import ReactDOM from 'react-dom';
import '../../css/basic/query.css';

var Query= React.createClass({
    render:function(){
        let query=null;
        if(this.props.query!==undefined&&this.props.query!==null)
            query=this.props.query;
        if(Object.prototype.toString.call(query)=='[object Object]')
            query = JSON.stringify(query);
        let label=null;
        if(this.props.label!==undefined&&this.props.label!==null)
            label=this.props.label;
        let ctrlName=null;
        if(this.props.ctrlName!==undefined&&this.props.ctrlName!==null)
            ctrlName=this.props.ctrlName;
        return(
            <div className="query">
                <button data-query={query} data-ctrlName={ctrlName}>
                    {label}
                </button>
            </div>
        );

    }
});
module.exports=Query;