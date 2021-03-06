import React from 'react'
import Moment from 'moment'

export default class ViewProject extends React.Component {
    suspendProject = () => {
        var p = this.props.project
        this.setState({ suspendStatus: true})
        this.props.onSelectSuspendProject(p)
    }

    updateProject = () => {
        var p = this.props.project
        this.props.onSelectEditProject(p)
    }

    renderSuspend= () =>{
        const p = this.props.project
        if (p.status) {
            return (
                <div className="btn-user-row">
                <button type="button" className="btn btn-outline-dark btn-block">Suspended</button>
            </div>
            );
        } else {
            return (
                <div>
                <div className="btn-user-row">
                                <button type="button" className="btn btn-outline-dark btn-block" onClick={this.updateProject}>Edit</button>
                            </div>
                <div className="btn-user-row">
                <button type="button" className="btn btn-outline-dark btn-block" onClick={this.suspendProject}>Suspend</button>
            </div>
            </div>
            )
        }
    }
    render() {
        const project = this.props.project
        return (
            <div className="viewUser">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-7 greyBox">
                            <div>
                                <label>Project: </label>
                                <span>{project.project}</span>
                            </div>
                            <div className="row">
                                <span className="col-sm-6">
                                    <label>No of Tasks: </label>
                                    <span>{project.tasks}</span>
                                </span>
                                <span className="col-sm-6">
                                    <label>Completed: </label>
                                    <span>{project.completedTasks}</span>
                                </span>
                            </div>
                            <div className="row">
                                <span className="col-sm-6">
                                    <label>Start Date: </label>
                                    <span>{Moment(project.startDate).format("YYYY-MM-DD")}</span>
                                </span>
                                <span className="col-sm-6">
                                    <label>End Date: </label>
                                    <span>{Moment(project.endDate).format("YYYY-MM-DD")}</span>
                                </span>
                            </div>
                        </div>
                        <div className="col-sm-2">
                            <div><label>Priority</label></div>
                            <div className="greyBox"><span>{project.priority}</span>
                                </div>
                        </div>
                        <div className="col-sm-3">
                            {this.renderSuspend()}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}