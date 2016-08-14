import React from 'react';
import {render} from 'react-dom';

var Basic = require('../../../../../src/structor/components/container/Basic.jsx');

var Nav = require('../../../../../framework/AppReact/components/basic/Nav.jsx');

var Note = require('../../../../../framework/AppReact/entrys/201513569/graduate/serviceHobby/modules/Note.jsx');

var ScaleBar = require('../../../../../framework/AppReact/components/basic/ScaleBar.jsx');


var App = React.createClass({

    render:function(){

      return (
            
        <Basic  >
           <Nav logo={"images/school_logo.png"} data={[{"label":"个人信息管理","sub":[{"label":"修改密码","query":""},{"label":"政策文件","query":"","route":"/comminfoservice/link/systemGuideLinkInfoViewInit.do"},{"label":"通知浏览","query":"","route":"/groupnews/grouptypenews_list.do"},{"label":"学术规范承诺书","query":"","route":"/questionnaire/student_questionnaire_init.do"},{"label":"联系方式维护","query":"","route":"/person/stuinfo_personBasicInfoUpdateInit.do"},{"label":"学籍信息","query":"","route":"/person/stuinfo_studentAllInfo.do"},{"label":"学生表现信息","query":"","route":"/person/stuinfo_allRewPunInfo.do?userType=TS"},{"label":"照片浏览","query":"","route":"/photomanage/showAllPhotoesForStu.do"}]},{"label":"报到注册","sub":[{"label":"报到须知","query":"","route":"/register/register_information.do"},{"label":"病史填写","query":"","route":"/health/healthyInfo_medical_history_add_init.do"},{"label":"绿色通道申请","query":"","route":"/greenway/grad/student_grad_greenway_add_applyinfoInit.do"},{"label":"免修英语申请","query":"","route":"/exemption/exemptionEnglishApplyInit.do?inputType=1"},{"label":"打印体检表","query":"","route":"/healthyInfo/healthyInfo_examine_form_download.do"}]},{"label":"培养管理2016","sub":[{"label":"导师与学生","sub":[{"label":"申请导师","query":"","route":"/tutor/tutor_stu_apply_tutor_init.do"}]},{"label":"培养方案与学生个人计划","sub":[{"label":"培养方案查询","query":"","route":"/cultivatenew/newCultivate_SchemeShow.do"},{"label":"制定培养计划","query":"","route":"/diminishMain"},{"label":"查看培养计划","query":"","route":"/cultivatenew/newCultivate_selectCourseShow.do"}]},{"label":"课程与选课","query":"","sub":[{"label":"课程查询","query":"","route":"/newCultivateAllCourseQueryPage"}]}]}]}  />
           <Note notes={["欢迎登陆山东大学数字迎新系统，请仔细阅读报道须知和各类通知,","并尽快选择下面的功能按要求完善相关信息和业务申请."]}  />
           <ScaleBar data={[{"label":"修改密码","img":"/images/serviceHobby/ico/y3.png","type":"Panel","content":{"title":"修改密码","auto":true,"bean":{"url":"/bsuims/reactPageDataRequest.do","params":{"reactActionName":"changePasswordInitReact","reactPageName":"userPasswordManageRulePage"}}}},{"label":"入学指南","img":"/images/serviceHobby/ico/y4.png","type":"IFrame","content":{"src":"/downloads/ruxuezhinan.pdf","width":"1000px","height":"500px"}}]}  />
           {this.props.children}
        </Basic>

            );
    }
});
module.exports= App;
