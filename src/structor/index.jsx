/**
 * Created by outstudio on 16/6/27.
 */
import React from 'react';
import {render} from 'react-dom';
import  './css/app.css';
import Container from './components/container/Container.jsx';
Boot();

function Boot(){

    render(
       <Container/>
        , document.getElementById('root'));



}

