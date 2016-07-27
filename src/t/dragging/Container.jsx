import React from 'react';
import {render} from 'react-dom';
import A from './A.jsx';
import C from './C.jsx';
import Blank from './Blank.jsx';
import Panel from './Panel.jsx';
import Table from './Table.jsx';

var Container=React.createClass({

    render:function(){

     return (
         <div>
             <A/>
             <C/>
             <hr/>
             <Blank data={{type:'B'}}>
             </Blank>
         </div>
     );


    }
});
module.exports=Container;
