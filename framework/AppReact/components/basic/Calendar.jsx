import React from 'react';
import {render} from 'react-dom';
import '../../css/basic/calendar.css';


/**
 * data: "2012-02-12"
 *
 */
var Calendar = React.createClass({
    getInitialState  : function () {
        var data = this.props.data;
        return ({data: data});
    },
    render           : function () {
        if (this.props.ctrlName !== undefined && this.props.ctrlName !== null) {

            return (
                <div className="input-append date"  ref="date-time-picker"
                     data-date={this.state.data!==undefined&&this.state.data!==null?this.state.data:"2012-02-12"}
                     data-date-format="yyyy-mm-dd hh:ii">
                    <input className="span2" size="16" name={this.props.ctrlName} type="text"
                           defaultValue={this.state.data!==undefined&&this.state.data!==null?this.state.data:"2012-02-12"}/>
                        <span className="add-on"><i className="icon-th"></i></span>
                    </div>
            );
        }
        else {
            return (<div></div>);
        }
    },
    componentDidMount: function () {
        var date_time_picker = this.refs["date-time-picker"];
        var $date_time_picker = $(date_time_picker);
        $date_time_picker.datetimepicker('setStartDate', '2016-01-01');

        $date_time_picker.datetimepicker('').on('changeDate', function (ev) {
            console.log('date_time==' + ev.date);
            this.setState({data: ev.date});
        //    $datetimepicker.children(".file")[0].value = ev.date;
        //    $datetimepicker.datetimepicker('hide');
        }.bind(this));

    }

});
module.exports = Calendar;