import React from 'react';
import {render} from 'react-dom';
import Front from './components/container/Front.jsx';


Boot();
function Boot(){
    render(
        <Front/>
        , document.getElementById('preview_root'));

}