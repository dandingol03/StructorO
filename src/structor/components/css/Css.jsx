import React from 'react';
import {render} from 'react-dom';
import Editor from './editor/Editor.jsx';
import '../../css/css.css';
var SyncStore=require('../../../../framework/AppReact/flux/stores/SyncStore');
var SyncActions = require('../../../../framework/AppReact/flux/actions/SyncActions');
var ProxyQ=require('../../../../framework/AppReact/components/proxy/ProxyQ');

var Css=React.createClass({
    _onCss:function(){
        var component=SyncStore.getCss();
        ProxyQ.queryHandle(
            null,
            '/get_css.do',
            {
                path:'framework/AppReact',
                component:component
            },
            'json',
            function(response){
                if(response.re==1)
                    this.setState({component:component,_css:response.data});
                else
                    console.error('server encounter error or file doesn\'t exists');
                console.log('css=====\r\n'+response.data);
            }.bind(this)
        );
    },
    saveHandle:function(ob){
        ProxyQ.queryHandle(
            null,
            '/save_css.do',
            {
                path:'framework/AppReact',
                component:this.state.component,
                data:ob.data
            },
            'json',
            function(response){
                if(response.re==1)
                    console.log("save success");
            }.bind(this)
        );
    },
    getInitialState:function(){
        return ({_css: null,component:null});
    },
    render:function(){
        if(this.state._css!==undefined&&this.state._css!==null) {
            return (
                <div className="css">
                    <div className="col-sm-3 col-xs-3 col-md-3 no-padding">
                        <div className="well" style={{padding: "8px 0"}}>
                            <ul className="nav nav-list">

                                <li className="active">
                                    <a href="index.htm">
                                        <i className="icon-white icon-home"></i>
                                        {this.state.component}
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-sm-9 col-xs-9 col-md-9 no-padding">
                        <Editor data={this.state._css} saveHandle={this.saveHandle}/>
                    </div>

                </div>
            );
        }
        else
            return <div className="css"></div>
    },
    componentDidMount:function(){
        SyncStore.addCssListener(this._onCss);
    },
    componentWillUnmount:function(){
        SyncStore.removeCssListener(this._onCss);
    }
});
module.exports=Css;