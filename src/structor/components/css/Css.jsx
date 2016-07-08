import React from 'react';
import {render} from 'react-dom';
var SyncStore=require('../../../../framework/AppReact/flux/stores/SyncStore');
var SyncActions = require('../../../../framework/AppReact/flux/actions/SyncActions');


/**
 * Css Editor
 */

var Css=React.createClass({
    _onCss:function(ob){

    },
    render:function(){

        return (
            <div style={{width:"100%",minHeight:"200px",border:"1px dashed red"}} className="css">

            </div>
        );
    },
    componentDidMount:function(){
        SyncStore.addCssListener(this._onCss);
    },
    componentWillUnmount: function () {
        SyncStore.removeEditListener(this._onCss);
    }
});
module.exports=Css;