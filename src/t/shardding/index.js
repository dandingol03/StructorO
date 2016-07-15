import React from 'react'
import { render } from 'react-dom'
import {IndexRoute, Router, Route, Link, browserHistory } from 'react-router'


import App from './App.jsx';
import A from './A.jsx';
import B from './B.jsx';
import C from './C.jsx';


render((
    <Router history={browserHistory}>
        <Route path={"/StructorO/shardding/index.html"} component={App}>
            <IndexRoute component={A}/>
            <Route path={"/StructorO/shardding/index.html/A"} component={A}/>
            <Route path={"/StructorO/shardding/index.html/B"} component={B}/>
            <Route path={"/StructorO/shardding/index.html/C"} component={C}/>
        </Route>
    </Router>
), document.getElementById('root'));