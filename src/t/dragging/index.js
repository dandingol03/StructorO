import React from 'react'
import { render } from 'react-dom'
import Container from './Container.jsx';
Boot();

function Boot(){
    render(
        <Container/>,
        document.getElementById('root')
    )
}
