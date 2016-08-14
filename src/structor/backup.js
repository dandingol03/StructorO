import React from 'react';
import {render} from 'react-dom';
import Container from './components/container/Container.jsx';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import Modal from './components/modal/Modal.jsx';
import Format from './components/format/Format.jsx';
import Css from './components/css/Css.jsx';
import Home from './components/home/Home.jsx';
import MainSection from './components/mainSection/MainSection.jsx';
import Export from './components/export/Export.jsx';
import PasswordModify from './PasswordModify.jsx';


Boot();
function Boot(){

    render((
        <Router history={browserHistory}>
            <Route path={'/get_render_page.do'} component={Container}>
                <IndexRoute component={Home}/>
                <Route path="/get_render_page.do/export" component={MainSection}/>
                <Route path="/get_render_page.do/password" component={PasswordModify}/>
            </Route>
        </Router>
    ), document.getElementById('root'));
}