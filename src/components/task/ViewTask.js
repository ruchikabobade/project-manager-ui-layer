import React from 'react'
import ViewTaskList from './ViewTaskList';
import axios from 'axios'
import DataTable from 'react-data-table-component'
import * as Constants from '../../constants';

const projectColumns = [
    {
        name: 'Project',
        selector: 'project',
        sortable: true,
    },
    {
        name: 'Priority',
        selector: 'priority',
        sortable: true,
    },
];
const project = {
    projectId: '',
    project: '',
    startDate: '',
    endDate: '',
    priority: '',
}
export default class ViewTask extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            initialtasks: [],
            project: '',
            projects: [],
            initialProjects: [],
            data: []
        }
    }

    componentWillMount() {
        axios.get(Constants.viewTaskURL).then(response => {
                this.setState({ initialtasks: response.data });
                this.setState({ tasks: response.data });
            })
    }

    filterList(e) {
        var updatedList = this.state.initialProjects;
        updatedList = updatedList.filter(function (project) {
            return project.project.toLowerCase().search(
                e.target.value.toLowerCase()) !== -1;
        });

        if (updatedList.length > 0) {
            this.setState({ projects: updatedList });
        }
    }
    endTask = (t) => {
        axios.delete(Constants.endTaskURL + t.taskId).then(res => {
                this.setState((preState)=>{
                  return { ...preState, tasks: preState.tasks.map( data => data.taskId === res.data.taskId  ? res.data : data )}
                })
              });
    }

    handleChangeProject = (state) => {
        if(state.selectedRows && state.selectedRows[0]){    
        project.projectId = state.selectedRows[0].projectId
        project.project = state.selectedRows[0].project
        project.priority = state.selectedRows[0].priority
        project.startDate = state.selectedRows[0].startDate
        project.endDate = state.selectedRows[0].endDate
        this.setState({ project: project.project  });
        axios.get(Constants.viewTaskByProjectIdURL + project.projectId).then(response => {
                this.setState({ tasks: response.data });
            });
        }
    }
    onSearch = () => {
        axios.get(Constants.viewUserURL).then(response => {
            this.setState({ users: response.data });
            this.setState({ initialUsers: response.data });
          });
      };
    onChangeProject(e) {
        this.setState({
            project: e.target.value
        });
    }
    compareBy = (key) => {
        return function (a, b) {
            if (a[key] < b[key]) return 1;
            if (a[key] > b[key]) return -1;
            return 0;
        };
    };
    sortList = (key) => {
        let arrayCopy = [...this.state.tasks];
        arrayCopy.sort(this.compareBy(key));
        this.setState({ tasks: arrayCopy });
    };

    onSearch = () => {
        axios.get(Constants.viewProjectURL).then(response => {
                this.setState({ projects: response.data });
                this.setState({ initialProjects: response.data });
            })
    }
    render() {
        const rows = []
        this.state.tasks.forEach((task) => {
            rows.push(
                <ViewTaskList task={task}
                    key={task.taskId}
                    onSelectEndTask={this.endTask}
                    onSelectEditTask={this.update} />
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
                                        <input className="form-control" type="text"  value={this.state.project} ></input>
                                    </div>
                                    <div className="col-sm-2">
                                        <button type="button" id="search" className="btn btn-outline-dark" data-toggle="modal" data-target="#myModal-project" onClick={() => this.onSearch('project')}>Search</button>
                                    </div>
                                </div>
                            </div>
                            <div className="modal fade" id="myModal-project" role="dialog">
                                <div className="modal-dialog">
                                    <div className='modal-content'>
                                        <div className='modal-header'>
                                            <h5 className='modal-title'>Search Manager</h5>
                                            <button type='button' className='close' data-dismiss='modal'>&times;</button>
                                        </div>
                                        <div className='modal-body'>
                                            <span>
                                                <input className="form-control" type="text" placeholder="Search..." onChange={this.filterList.bind(this)} />
                                            </span>
                                        </div>
                                        <div>
                                            <DataTable
                                                title="Project Details"
                                                columns={projectColumns}
                                                data={this.state.projects}
                                                selectableRows
                                                onTableUpdate={this.handleChangeProject}>
                                            </DataTable>
                                        </div>
                                        <div className='modal-footer'>
                                            <button type='button' className='btn btn-default' data-dismiss='modal'>Close</button>
                                        </div>
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