import React from 'react'
import Moment from 'moment'

export default class ViewProject extends React.Component {
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
                                    <span>5</span>
                                </span>
                                <span className="col-sm-6">
                                    <label>Completed: </label>
                                    <span>2</span>
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
                            <div className="btn-user-row">
                                <button type="button" className="btn btn-outline-dark btn-block" onClick={this.updateUser}>Edit</button>
                            </div>
                            <div className="btn-user-row">
                                <button type="button" className="btn btn-outline-dark btn-block" onClick={this.deleteUser}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}