import React from 'react';
import {render} from 'react-dom';

var Grid=React.createClass({

    getInitialState:function(){
        var data;
        if(this.props.data!==undefined&&this.props.data!==null)
            data=this.props.data;
        return({data:data});
    },
    render:function(){
        var content=  <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
        if(this.state.data!==undefined&&this.state.data!==null)
        {
            var trs=new Array();
            this.state.data.map(function(item,i) {
                trs.push(
                    <tr key={i}>
                        <td>{item}</td>
                    </tr>
                );
            });
            content=
                <tbody>
                    {trs}
                </tbody>
        }

     return (
       <table className="table Grid">
           <thead>
           <tr>
            <th>Grid</th>
           </tr>
           </thead>
           {content}
       </table>
     );
    }
});
module.exports=Grid;