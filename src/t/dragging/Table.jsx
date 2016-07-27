import React from 'react';
import {render} from 'react-dom';
import './css/table.css';

var Table=React.createClass({

    _dragStart:function(event){
        let target=event.currentTarget;
        let rect=target.getBoundingClientRect();
        let dragOffset = {
            top: event.clientY - rect.top,
            left: event.clientX - rect.left
        };
        event.dataTransfer.setData("Table",JSON.stringify({
            type:"Table",
            data:this.state.rows,
            drag:
            {
                offset:dragOffset,
                style:
                {
                    position:'absolute',
                    top:rect.top,
                    left:rect.left,
                    width:rect.width,
                    height:rect.height
                }
            }
        }));

    },
    mouseDown:function(event) {
        window.addEventListener('mousemove', this.mouseMove);
        window.addEventListener('mouseup', this.mouseUp);
        let target=event.currentTarget;
        let rect=target.getBoundingClientRect();
        let dragOffset = {
            top: event.clientY - rect.top,
            left: event.clientX - rect.left
        };
        this.setState({
            drag:
            {
                offset:dragOffset,
                style:
                {
                    position:'absolute',
                    top:rect.top,
                    left:rect.left,
                    width:rect.width,
                    height:rect.height
                }
            }
        })
    },
    mouseUp:function(event) {
        this.setState({drag: null});
        window.removeEventListener('mousemove', this.mouseMove);
        window.removeEventListener('mouseUp', this.mouseUp);
    },
    mouseMove:function(event){
        let drag=this.state.drag;
        drag.style.top=event.clientY-drag.offset.top;
        drag.style.left=event.clientX-drag.offset.left;
        this.setState({drag: drag});
    },
    selectStart:function(){
        return false;
    },
    getInitialState:function(){
        let rows=null;
        if(this.props.rows!==undefined&&this.props.rows!==null) {
            rows=this.props.rows;
        }
        else
            rows = ['danding', 'vergile'];
        return ({rows: rows});
    },
    redraw:function(data,styles){
        var trs=new Array();
        data.map(function(row,i) {
            trs.push(
                <tr key={i}>
                    <td>{row}</td>
                </tr>
            );
        });

        let style={border:"1px dashed #f00",width:"50%"};
        if(styles!==undefined&&styles!==null)
        {
            style=Object.assign(style,styles);
        }
        return (
            <div className="Table"
                 onDragStart={this._dragStart}
                 onMouseDown={this.mouseDown}
                 style={style}
                 ref="Table">
                <table>
                    <tbody>
                    {trs}
                    </tbody>
                </table>
            </div>
        );
    },
    render:function(){


        let copy=null;
        if(this.state.drag!==undefined&&this.state.drag!==null) {
            copy =    this.redraw(this.state.rows,this.state.drag.style);
        }

         return (
          <div>
              {this.redraw(this.state.rows,null)}
              {copy}
          </div>
         );
    }
});
module.exports=Table;