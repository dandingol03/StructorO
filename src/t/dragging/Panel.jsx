import React from 'react';
import {render} from 'react-dom';
import Table from './Table.jsx';
var Panel=React.createClass({
    drop:function(ev){
        var data =ev.dataTransfer.getData('Table');
        if(Object.prototype.toString.call(data)=='[object String]')
            data=eval('('+data+')');
        let drops=this.state.drops;
        drops.push(data);
        this.setState({drops: drops});
    },
    dragOver:function(ev){
        ev.preventDefault();
    },
    dragEnter:function(event){
        let target=event.currentTarget;
        let ne=event.nativeEvent;
        console.log('client x=' + ne.clientX);
        console.log('client y=' + ne.clientY);
    },
    getInitialState:function(){
        return ({drops: []});
    },
    render:function(){

        let childs=null;
        if(this.state.drops.length>0) {
            childs=new Array();
            this.state.drops.map(function(drop,i) {
               let ctrl=null;
                switch (drop.type) {
                    case 'Table':
                        ctrl=<Table rows={drop.data} key={i}/>
                        break;
                    default:
                        break;
                }
                childs.push(ctrl);
            });
        }
        return (
          <div className="panel"
               style={{border:"1px solid #00f",width:"60%",minHeight:"400px"}}
               onDrop={this.drop}
               onDragOver={this.dragOver}
               onDragEnter={this.dragEnter}
               ref="panel"
              >
              {childs}
              {this.props.children}
          </div>
        );
    }
});
module.exports=Panel;