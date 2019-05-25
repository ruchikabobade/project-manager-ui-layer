import React from 'react'
import Moment from 'moment'
import { withRouter } from 'react-router-dom';

 class ViewTaskList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          description : ""
        }
    }
    endTask = () => {
        var t = this.props.task
        this.props.onSelectEndTask(t)
    }

    updateTask = () => {
        const t = this.props.task
        let path = '/updateTask/' + t.taskId;
        this.props.history.push({
            pathname : path
            } 
          );
    }

    renderComplete= () =>{
        const t = this.props.task
        if (t.status === true) {
            return (
                 <div className="col-sm-2">
                <button type="button" className="btn btn-outline-dark ">Completed</button>
            </div>
            );
        } else {
            return (
                <div className="col-sm-2">
                <button type="button" className="btn btn-outline-dark" onClick={this.endTask}>EndTask</button>
            </div>
            )
        }
    }
    render() {
        const task = this.props.task
        return (
            <div className="">
                <div className="container viewTask">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div>Task</div>
                                    <div className="greyBox">{task.task}</div>
                                </div>
                                <div className="col-sm-6">
                                    <div>Parent</div>
                                    <div className="greyBox">{task.parentTask ?  task.parentTask.parentTask : "No Parent Task"}</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-8">
                            <div className="row">
                                <div className="col-sm-2">
                                    <div>Priority</div>
                                    <div className="greyBox">{task.priority}</div>
                                </div>
                                <div className="col-sm-3">
                                    <div>Start Date</div>
                                    <div className="greyBox">{Moment(task.startDate).format("YYYY-MM-DD")}</div>
                                </div>
                                <div className="col-sm-3">
                                    <div>End Date</div>
                                    <div className="greyBox">{Moment(task.endDate).format("YYYY-MM-DD")}</div>
                                </div>
                                <div className="col-sm-2">
                                    <button type="button" className="btn btn-outline-dark btn-block" disabled={task.status} onClick={this.updateTask}>Edit</button>
                                </div>
                               {this.renderComplete()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(ViewTaskList);