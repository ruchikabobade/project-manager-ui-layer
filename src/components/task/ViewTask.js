import React from 'react'
import ViewTaskList from './ViewTaskList';
import axios from 'axios'

export default class ViewTask extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            initialtasks: []
        }
    }

    componentWillMount() {
        axios.get('http://localhost:8080/projectmanager/service/task/viewTask')
            .then(response => {
                this.setState({ initialtasks: response.data });
                this.setState({ tasks: response.data });
                console.log(this.state.tasks)
            })
    }

    endTask = (t) =>{
        console.log(t)
        axios.delete('http://localhost:8080/projectmanager/service/task/endTask/' + t.taskId)
            .then(response => { 
            })
    }

    filterList(e) {
        var updatedList = this.state.initialtasks;
        updatedList = updatedList.filter(function (task) {
            return task.project.project.toLowerCase().search(
                e.target.value.toLowerCase()) !== -1;
        });

        if (updatedList.length > 0) {
            this.setState({ tasks: updatedList });
        }
    }

    compareBy = (key) => {
        return function (a, b) {
            if (a[key] < b[key]) return 1;
            if (a[key] > b[key]) return -1;
            return 0;
        };
    };
    sortList = (key) => {
        console.log("sort ")
        let arrayCopy = [...this.state.tasks];
        arrayCopy.sort(this.compareBy(key));
        this.setState({ tasks: arrayCopy });
    };

    onSearch =() =>{
        var project = 
        this.sortList('')
    }
    render() {
        const rows = []

        this.state.tasks.forEach((task) => {
            rows.push(
                <ViewTaskList task={task}
                    key={task.taskId}
                    onSelectEndTask={this.endTask}
                    onSelectEditTask={this.update}/>
            )
        });
        return (
            <div className="page-view">
            <div className="sort-filter">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-5">
                                <div className="row">
                                    <label className="col-sm-2">Project:</label>
                                    <div className="col-sm-6">
                                        <input className="form-control" type="text" placeholder="Search..." onChange={this.filterList.bind(this)}></input>
                                    </div>
                                    <div class="col-sm-2">
                                        <button type="button" id="search" className="btn btn-outline-dark" onClick={this.onSearch} >Search</button>
                                    </div>
                                </div>
                                </div>
                                <div className="col-sm-7">
                                    <div className="row">
                                        <span className="col-sm-2">Sort By:</span>
                                        <span className="col-sm-5">
                                            <span className="row">
                                                <span className="col-sm-6">
                                                    <button type="button" id="byStartDate" className="btn btn-outline-dark " onClick={() => this.sortList('startDate')}>Start Date</button>
                                                </span>
                                                <span className="col-sm-6">
                                                    <button type="button" id="byEndDate" className="btn btn-outline-dark" onClick={() => this.sortList('endDate')}>End Date</button>
                                                </span>
                                            </span></span>
                                        <span className="col-sm-5">
                                            <span className="row">
                                                <span className="col-sm-6">
                                                    <button type="button" id="byPriority" className="btn btn-outline-dark" onClick={() => this.sortList('priority')}>Priority</button>
                                                </span> <span className="col-sm-6">
                                                    <button type="button" id="byCompleted" className="btn btn-outline-dark" onClick={() => this.sortList('status')}>Completed</button>
                                                </span>
                                            </span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                      <div>{rows}</div>
                </div>
        )
    }
}