import React from 'react';
import {render} from 'react-dom';

var SyncStore=require('../../../../framework/AppReact/flux/stores/SyncStore');
var SyncActions = require('../../../../framework/AppReact/flux/actions/SyncActions');

/**
 * 1.全局唯一组件
 *
 */

var Modal=React.createClass({
    _onEdit:function(){
        var _edit=SyncStore.getEdit();
        this.setState({componentName:_edit.ob.type,properties:_edit.ob.data,callback:_edit.callback});
        var $modal=$(this.refs.Modal);
        $modal.modal("show");
    },
    saveCb:function(){
        var callback=this.state.callback;
        if(callback!==undefined&&callback!==null)
        {
            callback(this.state.properies);
            var $modal=$(this.refs.modal);
            this.state.properties=null;
            this.state.componentName=null;
            $modal.modal("hide");
        }
    },
    getInitialState:function(){
        var properties;
        if(this.props.properties!==undefined&&this.props.properties!==null)
            properties=this.props.properties;
        return ({componentName:null,properties:properties});
    },
    render:function(){



        return (
            <div className="modal fade" style={{display:"none"}} ref="Modal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                            <h4 className="modal-title">
                                {this.state.componentName}
                            </h4>
                        </div>
                        <div className="modal-body">
                            <span>properties</span>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-default" onClick={this.saveCb}>Save Properties</button>
                            <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div> );
    },
    componentDidMount:function(){
        SyncStore.addEditListener(this._onEdit);
    },
    componentWillUnmount: function () {
        SyncStore.removeEditListener(this._onEdit);
    }
});
module.exports=Modal;