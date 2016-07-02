/**
 * Created by outstudio on 16/6/27.
 */
import React from 'react';
import {render} from 'react-dom';
import  './css/app.css';
var Table=require('../../framework/AppReact/components/basic/Table.jsx');
var Wrapper=require('../../framework/AppReact/components/wrapper/Wrapper.jsx');
Boot();

function Boot(){
    render(
        <Wrapper>
            <Table
                query={{
           url:"/serviceHall/bsuims/reactPageDataRequest.do",
           params:{
                   reactPageName:'cultivateTutorPage',
                   reactActionName:"personIntroductionShow"
                  }
                 }}
                auto={true}
                filterField={['email','perName','perNum','perIdCard']}
                />
        </Wrapper>
        , document.getElementById('root'))
}

