import React from 'react'
import Moment from 'moment'
import { withRouter } from 'react-router-dom';
import {HashRouter, NavLink, Route} from 'react-router-dom'
import AddTask from './AddTask'

 class ViewTaskList extends React.Component {
    endTask = () => {
        var t = this.props.task
        this.props.onSelectEndTask(t)
    }

    updateTask = () => {
        const t = this.props.task
        //let path = `updateTask?id=${t.taskId}`;
        let path = '/updateTask/' + t.taskId;
        this.props.history.push({
            pathname : path
            } 
          );
    }

    renderComplete= () =>{
        const t = this.props.task
        console.log(t);
        if (t.status === "completed") {
            return (
                 <div className="col-sm-2">
                <button type="button" className="btn btn-outline-dark btn-block">Completed</button>
            </div>
            );
        } else {
            return (
                <div className="col-sm-2">
                <button type="button" className="btn btn-outline-dark btn-block" onClick={this.endTask}>End Task</button>
            </div>
            )
        }
    }
    render() {
        const task = this.props.task
        return (
            <div>
        
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div>Task</div>
                                    <div className="greyBox">{task.task}</div>
                                </div>
                                <div className="col-sm-6">
                                    <div>Parent</div>
                                    <div className="greyBox">{task.parentId}</div>
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
                                    <button type="button" className="btn btn-outline-dark btn-block" onClick={this.updateTask}>Edit</button>
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