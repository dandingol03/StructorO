import React from 'react';
import {render} from 'react-dom';
import Row from '../container/Row.jsx';
import '../../css/rows-editor.css';

/**
 * 1.RowsEditor组件生成的配置格式如下
 *      [
 *        {row:['stuType=>学生类型|select','stuName=>姓名|input']},
 *        {row:['college=>学院|span','apply=>提交|query']}
 *      ]
 */

var RowsEditor=React.createClass({
    recallCb:function(index,ob){
        console.log('index=' + index);
        this.state.rows[index]=ob;
    },
    _save:function(){
        //TODO:collect all the data in rows
        if(this.props.saveRowsCb!==undefined&&this.props.saveRowsCb!==null)
        {
            if(this.state.rows.length>0)
            {
                let rows=[];
                this.state.rows.map(function(row,i) {
                    let rowConf={};
                    rowConf.row=[];
                    row.map(function(ctrl,j) {
                       rowConf.row.push(ctrl.data.ctrlName+'=>'+ctrl.data.label+'|'+ctrl.type);
                    });
                    rows.push(rowConf);
                });
                this.props.saveRowsCb(rows);
            }
        }
    },
    _add:function(){
        this.setState({count: this.state.count+1});
    },
    _minus: function () {
        let nodes=[];
        $.extend(true, nodes, this.state._nodes);
        let ob={};
        ob.count=this.state.count-1;
        if(nodes.length>ob.count)
            ob._nodes = nodes.splice(nodes.length - 1, 1);
        this.setState(ob);
    },
    getInitialState:function()
    {
        return ({count: 1,rows:[]});
    },
    render:function(){

        let rows=[];

        for(let i=0;i<this.state.count;i++) {
            if(this.state.rows[i]!==undefined&&this.state.rows[i]!==null)
                rows.push(<Row recall={this.recallCb.bind(this,i)} data={this.state.rows[i]} key={i}/>);
            else
                rows.push(<Row recall={this.recallCb.bind(this,i)} key={i}/>);
        }


        return (
            <div className="rows-editor" ref="rows-editor">
                <ul>
                    {rows}
                </ul>
                <div className="delete-row"><span className="fa fa-minus" onClick={this._minus}></span></div>
                <div className="plus-row"><span className="fa fa-plus" onClick={this._add}></span></div>
                <div className="save-all"><span className="fa fa-floppy-o" onClick={this._save}></span></div>
            </div>
        );
    },
    componentDidMount:function(){


    }
});
module.exports=RowsEditor;