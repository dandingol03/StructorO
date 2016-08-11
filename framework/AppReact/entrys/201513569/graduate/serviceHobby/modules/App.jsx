import React from 'react';
import {render} from 'react-dom';
import { Link } from 'react-router'
import Nav from '../../../../../components/basic/Nav.jsx';
import IndexScroll from '../../../../../components/basic/IndexScroll.jsx';
import ScaleBar from '../../../../../components/basic/ScaleBar.jsx';
import CustomMenu from '../../../../../components/basic/CustomMenu.jsx';
import HighLight from '../../../../../components/basic/HighLight.jsx';
import Footer from '../../../../../components/basic/Footer.jsx';
import '../../../../../css/serviceHobby/basic/app.css';
import MENU from '../data/menus.json';
import Scales from '../data/scaleBar.json';
import Scrolls from '../data/scrolls.json';
import CommonFunction from './CommonFunction.jsx';
import Brief from './Brief.jsx';
import Note from './Note.jsx';

var App =React.createClass({
    app$init:function(){

    },

    render:function(){

        return (
        /**
         * header box part
         */
            <div>
                <Nav logo={Deploy.getResourceDeployPrefix()+"/"+"images/school_logo.png"} data={MENU}/>
                <Note notes={['欢迎登陆山东大学数字迎新系统，请仔细阅读报道须知和各类通知,','并尽快选择下面的功能按要求完善相关信息和业务申请.']}/>
                {this.props.children}
                <ScaleBar data={Scales}/>
                <Footer/>
            </div>

        )
    },
    componentDidMount:function(){
        this.app$init();
    }

});

export default App;