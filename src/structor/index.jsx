/**
 * Created by outstudio on 16/6/27.
 */
import React from 'react';
import {render} from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import  './css/app.css';
import Container from './components/container/Container.jsx';
import Modal from './components/modal/Modal.jsx';
import Format from './components/format/Format.jsx';
import Css from './components/css/Css.jsx';




Boot();
function Boot(){

    //TODO:get your all json files


    render((
        <Router history={browserHistory}>
            <Route path={'/get_render_page.do'} component={Container}>
            </Route>
        </Router>
    ), document.getElementById('root'));
}




