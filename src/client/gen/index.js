import React from 'react';
import {render} from 'react-dom';

var Panel = require('../../../AppReact/components/basic/Panel.jsx');

var OrdinaryTable = require('../../../AppReact/components/form/OrdinaryTable.jsx');



    render(
        
        <div  >
        <Panel  >
        <Grid data={["danding","dante","vergile"]}  />
        </Panel>
        </div>

        , document.getElementById('root'));