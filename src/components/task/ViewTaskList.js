import React from 'react'
import Moment from 'moment'

export default class ViewTaskList extends React.Component {
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
                                    <button type="button" className="btn btn-outline-dark btn-block">Edit</button>
                                </div>
                                <div className="col-sm-2">
                                    <button type="button" className="btn btn-outline-dark btn-block">Edit</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}