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
        this.setState({componentName:_edit.ob.type,properties:JSON.stringify(_edit.ob.data),callback:_edit.callback});
        var $modal=$(this.refs.Modal);
        $modal.modal("show");
    },
    onChange:function(evt){
        this.setState({properties:evt.target.value});
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

        var properties=null;
        if(this.state.properties!==undefined&&this.state.properties!==null)
            properties=this.state.properties;


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
                            <div>
                                <div className="bs-example bs-example-tabs" data-example-id="togglable-tabs">
                                    <ul id="myTabs" className="nav nav-tabs" role="tablist">
                                        <li role="presentation" className="">
                                            <a href="#properties" id="properties-tab" role="tab" data-toggle="tab" aria-controls="home" aria-expanded="false">Properties</a>
                                        </li>
                                        <li role="presentation" className="active">
                                            <a href="#document" role="tab" id="profile-tab" data-toggle="tab" aria-controls="profile" aria-expanded="true">Document</a>
                                        </li>
                                    </ul>
                                    <div id="myTabContent" className="tab-content">
                                        <div role="tabpanel" className="tab-pane fade" id="properties" aria-labelledby="properties-tab">
                                            <textarea  style={{width:"100%",minHeight:"200px"}} value={properties} onChange={this.onChange} ref="editor">
                                            </textarea>
                                        </div>
                                        <div role="tabpanel" className="tab-pane fade active in" id="document" aria-labelledby="profile-tab">
                                            <p>Food truck fixie locavore, accusamus mcsweeney's marfa nulla single-origin coffee squid. Exercitation +1 labore velit, blog sartorial PBR leggings next level wes anderson artisan four loko farm-to-table craft beer twee. Qui photo booth letterpress, commodo enim craft beer mlkshk aliquip jean shorts ullamco ad vinyl cillum PBR. Homo nostrud organic, assumenda labore aesthetic magna delectus mollit. Keytar helvetica VHS salvia yr, vero magna velit sapiente labore stumptown. Vegan fanny pack odio cillum wes anderson 8-bit, sustainable jean shorts beard ut DIY ethical culpa terry richardson biodiesel. Art party scenester stumptown, tumblr butcher vero sint qui sapiente accusamus tattooed echo park.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
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