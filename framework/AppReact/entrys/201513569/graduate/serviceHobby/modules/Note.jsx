import React from 'react';
import {render} from 'react-dom';
import CommonFunction from './CommonFunction.jsx';
import Brief from './Brief.jsx';

import '../../../../../css/serviceHobby/basic/note.css';

var Note=React.createClass({

    render:function(){

        let notes=[]
        if(this.props.notes!==undefined&&this.props.notes!==null)
        {
            notes=this.props.notes;
        }

        return(
            <div className="keyNavigation Note">
                <div className="top">
                    <div className="block">
                        <Brief data={notes}/>
                    </div>
                </div>
                <div className="bottom">
                    <CommonFunction auto={true}/>
                </div>
            </div>
        );
    }
});
module.exports=Note;