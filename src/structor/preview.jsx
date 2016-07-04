import React from 'react';
import {render} from 'react-dom';

Boot();
function Boot(){

    render(
        <div>
            <button style={{position:"absolute",right:"20px",top:"20px"}}>
                close me
            </button>
        </div>
        , document.getElementById('preview_root'));

}