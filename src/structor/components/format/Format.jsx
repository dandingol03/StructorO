import React from 'react';
import {render} from 'react-dom';
var SyncStore=require('../../../../framework/AppReact/flux/stores/SyncStore');
var SyncActions = require('../../../../framework/AppReact/flux/actions/SyncActions');


/**
 * Css Editor
 */

var Format=React.createClass({
    _onFormat:function(){
        var parsed=SyncStore.getFormat();
        var reg=/(style=\".*?\")/g;
        var re=null;
        var previousIndex=0;
        var pre=new Array();
        var k=0;
        while(re=reg.exec(parsed))
        {
            var span=parsed.substring(previousIndex,re.index);
            pre.push(<span key={k++}>{span}</span>);
            previousIndex=re.index+re[1].length;
            pre.push(<input key={k++} type="text" defaultValue={re[1]}/>);
        }
        if(previousIndex<parsed.length-1)
            pre.push(<span key={k++}>{parsed.substring(previousIndex)}</span>);
        this.setState({pre:pre});
    },
    getInitialState:function(){

      return {pre:null}
    },
    render:function(){

        var pre;
        if(this.state.pre!==undefined&&this.state.pre!==null)
            pre=
                <pre>
                    {this.state.pre}
                </pre>;
        return (
            <div style={{width:"100%",minHeight:"200px",border:"1px dashed red"}} className="css">
                {pre}
            </div>
        );
    },
    componentDidMount:function(){
        SyncStore.addFormatListener(this._onFormat);
    },
    componentWillUnmount: function () {
        SyncStore.removeFormatListener(this._onFormat);
    }
});
module.exports=Format;