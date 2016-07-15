import React from 'react';
import {render} from 'react-dom';
<%
 _.forEach(dependencies, function(module) {
%>
var <%- module.name %> = require('<%- module.route %>');
<% });
%>


    render(
        ${content}
        , document.getElementById('root'));