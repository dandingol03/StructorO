import React from 'react';
import {render} from 'react-dom';
<%
 _.forEach(dependencies, function(module) {
%>
var <%- module.name %> = require('<%- module.route %>');
<% });
%>

var <%- className %> = React.createClass({

    render:<%- func %>(){

      return (
            ${content}
            );
    }
});
module.exports= <%- className %>;
