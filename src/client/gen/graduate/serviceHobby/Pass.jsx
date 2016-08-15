import React from 'react';
import {render} from 'react-dom';

var PanelTable = require('../../../../../framework/AppReact/components/compounds/PanelTable.jsx');

var Basic = require('../../../../../src/structor/components/container/Basic.jsx');


var Pass = React.createClass({

    render:function(){

      return (
            
        <Basic  >
           <PanelTable autoComplete={true} filterField={{"order":true,"courseNum":true,"courseName":true,"courseType":true,"credit":true,"classHour":true,"termCount":true,"examTypeName":true,"managerName":true,"link":true}} rowsEditable={true}  />
           {this.props.children}
        </Basic>

            );
    }
});
module.exports= Pass;
