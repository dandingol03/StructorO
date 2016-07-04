import React from 'react';
import {render} from 'react-dom';
import Container from './components/container/Container.jsx';


Boot();
function Boot(){

    render(
        <Container/>
        , document.getElementById('preview_root'));

}