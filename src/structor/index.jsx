/**
 * Created by outstudio on 16/6/27.
 */
import React from 'react';
import {render} from 'react-dom';
import  './css/app.css';
import Container from './components/container/Container.jsx';
import Wrapper from './components/wrapper/Wrapper.jsx';
import Table from '../../framework/AppReact/components/basic/Table.jsx';
import Modal from './components/modal/Modal.jsx';
Boot();

function Boot(){

    var data={email:'xx',perName:'xx',perNum:'xx',perIdCard:1142051104};
    render(
        <div>
            <Wrapper>
            </Wrapper>
            <Modal/>
        </div>

        , document.getElementById('root'));



}

