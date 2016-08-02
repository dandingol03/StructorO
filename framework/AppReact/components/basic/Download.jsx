import React from 'react';
import {render} from 'react-dom';
var ProxyQ=require('../proxy/ProxyQ');

/**
 * Download组件,当本地服务器可编译后,恢复预览
 */

var Download=React.createClass({

    render:function() {
        var attach=null;
        if (this.props.attachId !== undefined && this.props.attachId !== null){
            var href=ProxyQ.getPrefix()+"/attachment/attachmentDownloadAttachmentBSFile.do?attachId="+this.props.attachId;
            attach=<a href={href}>{this.props.children}</a>;
        }else{
            var href=ProxyQ.getPrefix()+this.props.href;
            attach=<a href={href}>{this.props.title}</a>;
        }

        return(<div>
                {attach}
                </div>);

    }
});
export default Download;