/**
 * Created by outstudio on 16/6/27.
 */
import React from 'react';
import {render} from 'react-dom';
import  './css/app.css';
import Container from './components/container/Container.jsx';
Boot();

function Boot(){

    render(

        <Wrapper>
            <Table
                query={{
           url:"/sduyingxin/bsuims/reactPageDataRequest.do",
           params:{
                   reactPageName:'cultivateTutorPage',
                   reactActionName:"personIntroductionShow"
                  }
                 }}
                auto={true}
                filterField={['email','perName','perNum','perIdCard']}
                />
        </Wrapper>

        , document.getElementById('root'));



}

