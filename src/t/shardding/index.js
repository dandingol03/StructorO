import React from 'react'
import { render } from 'react-dom'
import {IndexRoute, Router, Route, Link, browserHistory } from 'react-router'


import App from './App.jsx';



const rootRoute = {
    component: 'App',
    childRoutes: [{
        path: '/StructorO/shardding/index.html',
        component: require('./App'),
        childRoutes:[
            require('./routes/A'),
            require('./routes/B'),
            require('./routes/C')
        ]
    }]

}

render(
    <Router history={browserHistory} routes={rootRoute} />,
    document.getElementById('root')
)


