import React from 'react';
import {render} from 'react-dom';
import Panel from '../panel/Panel.jsx';
import OrdinaryTable from '../forms/OrdinaryTable.jsx';
import Pagination from '../../components/basic/Pagination.jsx';

import '../../css/compounds/panelTable.css';

var ProxyQ=require('../proxy/ProxyQ');

var PanelTable=React.createClass({
    clickHandle:function(ob){
        if((this.props.query!==undefined&&this.props.query!==null)||
            (ob.query!==undefined&&ob.query!==null))
        {
            let query=null;
            if(this.props.query!==undefined&&this.props.query!==null)
                query=this.props.query;
            else
                query=ob.query;
            var params;
            let additional={};
            for(var field in ob)
            {
                if(field!=='query')
                    additional[field]=ob[field];
            }
            params=Object.assign(query.params!==null&&query.params!==undefined?query.params:'',
                additional!==undefined&&additional!==null?additional:'');
            ProxyQ.queryHandle(
                'GET',
                query.url,
                params,
                null,
                function(response){
                    //这里需要统一规范后台返回的数据格式
                    var ob=new Object();
                    if(response.arr!==undefined&&response.arr!==null)
                        ob.data=response.arr;
                    if(response.tail!==undefined&&response.tail!==null)
                    {
                        try{
                            ob.tail=eval(response.tail);
                        }catch(e)
                        {
                            alert("error="+e);
                        }
                    }
                    if(response.translation!==undefined&&response.translation!==null){
                        ob.translation=response.translation;
                    }
                    if(response.pageInfo!==undefined&&response.pageInfo!==null)
                    {
                        ob.pageInfo=response.pageInfo;
                    }
                    else {
                        var length =response.arr.length;
                        console.log();
                        console.log();
                        ob.pageInfo = {
                            perSize: 40,
                            size   : length
                        };
                    }
                    this.setState(ob);
                }.bind(this)
            );


        }
    },
    pageCb:function(ob){
        if(Object.prototype.toString.call(ob)=='[object Object]')
        {
            this.setState({pageInfo: ob});
        }
    },
    goGetPageData:function(data)
    {
        if(data!==undefined&&data!==null)
        {
            var selected = 0;
            var perSize = 40;
            if (this.state.pageInfo !== undefined && this.state.pageInfo !== null) {
                selected = this.state.pageInfo.selected;
                perSize = this.state.pageInfo.perSize;
            }
            return data.slice(selected * perSize, (selected + 1) * perSize > data.length ? data.length : (selected + 1) * perSize);
        }

    },
    getInitialState:function(){

        var comps;
        var data;
        if(this.props.comps!==undefined&&this.props.comps!==null)
        {
            comps=this.props.comps;
        }
        if(this.props.data!==undefined&&this.props.data!==null)
        {
            data=this.props.data;
        }
        var bean;
        if(this.props.bean!==undefined&&this.props.bean!==null)
            bean=this.props.bean;

        return({comps:comps,data:data,bean:bean});
    },
    renderPage : function () {
        var pagination = null;
        if (this.props.pagination == true) {
            pagination = <Pagination pageCb={this.pageCb}
                                     perSize={this.state.pageInfo!==undefined&&this.state.pageInfo!==null?this.state.pageInfo.perSize:40}
                                     size={this.state.data!==undefined&&this.state.data!==null?this.state.data.length:0}/>;
        }
        return pagination;
    },
    componentWillReceiveProps:function(props)
    {
        //TODO:
        let ob={};
        if(this.state.bean!==props.bean)
            ob.bean=props.bean;
        if(this.state.query!==props.query)
            ob.query=props.query;
        this.setState(ob);
    },
    render:function(){
        var data;
        //pagination本地配
        if(this.props.pagination==true)
        {
            data=this.goGetPageData(this.state.data);
        }
        else
            data=this.state.data;

        let panel=null;
        if(this.state.bean!==undefined&&this.state.bean!==null&&
            this.state.bean.rows!==undefined&&this.state.bean.rows!==null&&
            this.state.bean.params!==undefined&&this.state.bean.params!==null)
        {
            panel= <Panel
                data={this.state.comps}
                bean={this.state.bean}
                auto={true}
                autoComplete={true}
                query={this.props.query}
                clickHandle={this.clickHandle}
                />;
        }
        else{
            panel=<Panel
                data={[{row:['edit panel bean']}]}
                auto={false}
                autoComplete={true}
                />;
        }

        return (
            <div className="row panelTable">
                <div className="col-sm-12 col-md-12" style={{paddingLeft:"0px",paddingRight:"0px",paddingTop:"30px"}}>
                    {panel}
                    <OrdinaryTable
                        autoFetch={false}
                        data={data}
                        tail={this.state.tail}
                        filterField={this.props.filterField}
                        translation={this.state.translation}
                        />
                    {this.renderPage()}
                </div>
            </div>
        )




    }
});
export default PanelTable;