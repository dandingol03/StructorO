import React from 'react';
import {render} from 'react-dom';
import '../../css/basic/cpanel.css';
var SyncStore=require('../../flux/stores/SyncStore');
var SyncActions = require('../../flux/actions/SyncActions');


var CPanel=React.createClass({
    dropEnable:function()
    {
        return true;
    },
    render:function(){
        return (
            <div className="cPanel">
                <span>Panel</span>
                {this.props.children}
            </div>
        );
    }
});
module.exports=CPanel;