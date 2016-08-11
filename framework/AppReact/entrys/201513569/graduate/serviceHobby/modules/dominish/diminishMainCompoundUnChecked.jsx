

import React from 'react';
import {render} from 'react-dom';
import Table from '../../../../../../components/forms/Table.jsx';
import ListElement from '../../../../../../components/basic/ListElement.jsx';
import ButtonElement from '../../../../../../components/basic/ButtonElement.jsx';
import CoupleTableElement from '../../../../../../components/compounds/coupleTable/CoupleTableElement.jsx';
import OrdinaryTable from '../../../../../../components/forms/OrdinaryTable.jsx'

/**
 * @author:zyy
 */

var DiminishMain=React.createClass({
    render:function(){

        console.log('...');



        function cb(ob){
            console.log("ob=" + ob);
            if(ob!==undefined&&ob!==null)
            {
                if(ob.index!==undefined&&ob.index!==null) {
                    if(this.props.index!==ob.index)//与发出消息的组件编号不同
                    {
                        var addRegex=/^add/g;
                        var data=this.state.data;
                        if(addRegex.test(ob.method))//将消息源的记录添加
                        {
                            if(ob.multiCheck==true)
                            {
                                ob.content.map(function(item,i){
                                    data.push(item);
                                });
                            }else{
                                data.push(ob.content);
                            }
                            var titles=new Array();
                            var cols;
                            for(var field in data[0])
                            {
                                titles.push(field);
                            }
                            cols=titles.length;
                            this.setState({data:data,cols:cols,titles:titles,data$initialed:true});
                        }
                    }
                }
            }
        }
        function check$apply$1(ob){
            console.log("ob="+ob);
        }

        var check$apply$2=function(ob){
            console.log("ob="+ob);

        }

        var data1=[
            {'name':'wjj','age':18,'sex':'man'},
            {'name':'wang','age':22,'sex':'man'},
            {'name':'bigBang','age':18,'sex':'man'},
            {'name':'lalala','age':14,'sex':'man'},
            {'name':'zyy','age':25,'sex':'woman'},
            {'name':'bianfu','age':20,'sex':'woman'},
            {'name':'baomu','age':18,'sex':'woman'},
            {'name':'official','age':17,'sex':'woman'}
        ]
        var data2=[
        ];
        var data$options={
            url:"/gradms/bsuims/reactPageDataRequest.do",
            params:{
                reactPageName:'newCultivatePlanPage',
                reactActionName:'newPlanSelectCourse'
            }
        }
        var data$options$1={

            subscribe:[{type:'fire',callback:cb}]

        }

        var data$options$2={
            subscribe:[{type:'fire',callback:cb}]
        }


        /*    var tags=[{"data":data1,"data-options":data$options$1}
         ,{"data":data2,"data-options":data$options$2}];*/
        var tags=[
            {"data-options":data$options$1}
            ,{"data-options":data$options$2}
        ];
        var containerStyle={textAlign:"center"};
        render(
            <div className="diminishMain">
                <CoupleTableElement tags={tags} data-options={data$options}/>
                <OrdinaryTable />
            </div>
            , document.getElementById('root'))


    }

});
module.exports=DiminishMain;




