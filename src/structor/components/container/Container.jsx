import React from 'react';
import {render} from 'react-dom';
import Table from '../../../../framework/AppReact/components/basic/Table.jsx';
import Panel from '../../../../framework/AppReact/components/basic/Panel.jsx';
import Modal from '../modal/Modal.jsx';
import Wrapper from '../wrapper/Wrapper.jsx';


var Container=React.createClass({

    getInitialState:function(){
        return({_tree:null});
    },
    render:function(){
        if(this.state._tree!==undefined&&this.state._tree!==null)
        {
            return <div></div>
        }
        else{
            return (
                <div>
                    <Wrapper />
                    <Modal/>
                </div>
            );
        }
    }
});
module.exports=Container;