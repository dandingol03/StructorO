import React from 'react';
import {render} from 'react-dom';
var SyncStore=require('../../../../framework/AppReact/flux/stores/SyncStore');
var SyncActions = require('../../../../framework/AppReact/flux/actions/SyncActions');
var ProxyQ=require('../../../../framework/AppReact/components/proxy/ProxyQ');

var Css=React.createClass({
    _onCss:function(){
        var componentName=SyncStore.getCss();
        ProxyQ.queryHandle(
            null,
            '/get_css.do',
            {
                path:'framework/AppReact',
                componentName:componentName
            },
            'json',
            function(response){
                if(response.re==1)
                    this.setState({_css:response.data});
                else
                    console.error('server encounter error or file doesn\'t exists');
            }.bind(this)
        );
    },
    getInitialState:function(){
        return ({_css: null});
    },
    render:function(){
        if(this.state._css!==undefined&&this.state._css!==null) {
            return <div></div>
        }
        else
        return <div></div>
    },
    componentDidMount:function(){
        SyncStore.addCssListener(this._onCss);
    },
    componentWillUnmount:function(){
        SyncStore.removeCssListener(this._onCss);
    }
});
module.exports=Css;