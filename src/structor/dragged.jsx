/**
 * Created by outstudio on 16/6/27.
 */
import React from 'react';
import {render} from 'react-dom';
var Dragged = require('./components/container/Dragged.jsx');
Boot();

function Boot(){

    render(
        <Dragged/>
        , document.getElementById('Dragged'));

}

