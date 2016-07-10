import React from 'react';
import {render} from 'react-dom';
import '../../css/basic/panel.css';
var SyncStore=require('../../flux/stores/SyncStore');
var SyncActions = require('../../flux/actions/SyncActions');


var Panel=React.createClass({

    render:function(){
        return (
            <div className="panel">
                <span>Panel</span>
                {this.props.children}
            </div>
        );
    }
});
module.exports=Panel;