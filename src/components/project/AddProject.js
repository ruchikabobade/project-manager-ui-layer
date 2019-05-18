import React from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import ViewProject from './ViewProject'


const columns = [
    {
        name: 'First Name',
        selector: 'firstName',
        sortable: true,
    },
    {
        name: 'Last Name',
        selector: 'lastName',
        sortable: true,
    },
    {
        name: 'Employee ID',
        selector: 'employeeId',
        sortable: true,
    },
];

const user = {
    userId : '',
    firstName : '',
    lastName: '',
    employeeId : '',
}

export default class AddProject extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeProject = this.onChangeProject.bind(this)
        this.onChangeSetDate = this.onChangeSetDate.bind(this)
        this.onChangeStartDate = this.onChangeStartDate.bind(this)
        this.onChangeManager = this.onChangeManager.bind(this)
        this.onChangePriority = this.onChangePriority.bind(this)
        this.onChangeEndDate = this.onChangeEndDate.bind(this)

        this.state = {
            project: "",
            setDate: false,
            startDate: new Date(),
            endDate: new Date(),
            priority: 10,
            manager: "",
            users: [],
            initialProjects: [],
            projects: []
        }
    }

    componentWillMount() {
        axios.get('http://localhost:8080/projectmanager/service/project/viewProject')
            .then(response => {
                this.setState({ initialprojects: response.data });
                this.setState({ projects: response.data });
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

    compareBy = (key) => {
        return function (a, b) {
            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        };
    };

    sortList = (key) => {
        let arrayCopy = [...this.state.users];
        arrayCopy.sort(this.compareBy(key));
        this.setState({ users: arrayCopy });
    };

    onChangeProject(e) {
        this.setState({
            project: e.target.value
        });
    }
    onChangeSetDate = () => {
        if (this.state.setDate === true) {
            this.setState({ setDate: false })
        }
        else {
            this.setState({ setDate: true })
        }
    }
    onChangeStartDate(e) {
        this.setState({
            startDate: e.target.value
        });
    }
    onChangeEndDate(e) {
        this.setState({
            endDate: e.target.value
        });
    }
    onChangePriority(e) {
        this.setState({
            priority: e.target.value
        });
    }
    onChangeManager(e) {
        this.setState({
            manager: e.target.value
        });
    }

    onReset(e) {
        this.setState({
            project: '',
            setDate: false,
            startDate: '',
            endDate: '',
            priority: '',
            manager: ''
        });
    }

    onSearch = () => {
        axios.get('http://localhost:8080/projectmanager/service/user/viewUser')
            .then(response => {
                this.setState({ users: response.data });
            })
    }

    onSubmit(e) {
        e.preventDefault();
        const project = {
            project: this.state.project,
            startDate: this.state.startDate,
            setDate: this.state.setDate,
            endDate: this.state.endDate,
            priority: this.state.priority,
            manager: this.state.manager
        }
        const record = {
            taskId: 0,
            task: "",
            user: user,
            project: project
        }

        axios.post('http://localhost:8080/projectmanager/service/project/addProject', record
        ).then(res => console.log(res.data));
    }

    handleChange = (state) => {
        user.userId = state.selectedRows[0].userId
        user.firstName = state.selectedRows[0].firstName
        user.lastName = state.selectedRows[0].lastName
        user.employeeId = state.selectedRows[0].employeeId
        console.log('Selected Rows: ', state.selectedRows);
        console.log(user);
    }

    render() {
        const rows = []

        this.state.projects.forEach((project) => {
            rows.push(
                <ViewProject project={project}
                    key={project.project} />
            )
        });
        return (
            <div>
                <form className="form-horizontal" onSubmit={this.onSubmit.bind(this)}>
                    <div class="container">
                        <div class="row">
                            <div class="form-group form-group-sm col-sm-12">
                                <div class="row">
                                    <label class="col-sm-3 col-form-label"> Project: </label>
                                    <div class="col-sm-9">
                                        <input type="text" className="form-control" value={this.state.project} onChange={this.onChangeProject.bind(this)} />
                                    </div>
                                </div>
                            </div>
                            <div class="form-group form-group-sm col-sm-12">
                                <div class="row">
                                    <div class="col-sm-4">
                                        <input type="checkbox"
                                            name="date"
                                            onChange={this.onChangeSetDate.bind(this)} >
                                        </input>Set Start and End Date
                                    </div>
                                    <div class="col-sm-4">
                                        <input type="date" id="startDate" defaultValue={this.state.startDate} onChange={this.onChangeStartDate.bind(this)}></input>
                                    </div>
                                    <div class="col-sm-4">
                                        <input type="date" id="endDate" defaultValue={this.state.endDate} onChange={this.onChangeEndDate.bind(this)}></input>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group form-group-sm col-sm-12">
                                <div class="row">
                                    <label class="col-sm-3 col-form-label"> Priority: </label>
                                    <div class="col-sm-9 rangeIn">
                                        <input type="range"
                                            value={this.state.priority}
                                            min="0"
                                            max="20"
                                            step="1"
                                            className="slider" id="myRange"
                                            onChange={this.onChangePriority.bind(this)} />
                                    </div>
                                </div>
                            </div>
                            <div class="form-group form-group-sm col-sm-12">
                                <div class="row">
                                    <label class="col-sm-3 col-form-label"> Manager: </label>
                                    <div class="col-sm-7">
                                        <input type="text" id="manager" className="form-control" value={this.state.manager} onChange={this.onChangeManager.bind(this)} />
                                    </div>
                                    <div class="col-sm-2">

                                        <button type="button" id="search" className="btn btn-outline-dark" data-toggle="modal" data-target="#myModal" onClick={this.onSearch} >Search</button>

                                    </div>
                                </div>
                            </div>
                            <div class="form-group form-group-sm col-sm-12">
                                <div class="row">
                                    <input type="submit" id="formSubmit" value="Add" className="btn btn-outline-dark" />
                                    <button type="button" id="reset" className="btn btn-outline-dark" onClick={this.onReset.bind(this)}>Reset</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="modal fade" id="myModal" role="dialog">
                    <div className="modal-dialog">
                        <div className='modal-content'>
                            <div className='modal-header'>
                                <h5 className='modal-title'>Search Manager</h5>
                                <button type='button' className='close' data-dismiss='modal'>&times;</button>
                            </div>
                            <div className='modal-body'>
                                <DataTable
                                    title="Users Details"
                                    columns={columns}
                                    data={this.state.users}
                                    selectableRows
                                    onTableUpdate={this.handleChange}>
                                </DataTable>
                            </div>
                            <div className='modal-footer'>
                                <button type='button' className='btn btn-default' data-dismiss='modal'>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-12">
                                    <span><input className="form-control" type="text" placeholder="Search..." onChange={this.filterList.bind(this)}></input></span>
                                </div>
                                </div>
                                <div className="row">
                                <div className="col-sm-12">
                                    <span>Sort: <button type="button" id="byStartDate" className="btn btn-outline-dark col-sm-2" onClick={() => this.sortList('startDate')}>Start Date</button>
                                        <button type="button" id="byEndDate" className="btn btn-outline-dark col-sm-2" onClick={() => this.sortList('endDate')}>End Date</button>
                                        <button type="button" id="byPriority" className="btn btn-outline-dark col-sm-2" onClick={() => this.sortList('priority')}>Priority</button>
                                        <button type="button" id="byCompleted" className="btn btn-outline-dark col-sm-2" onClick={() => this.sortList('completed')}>Completed</button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>{rows}</div>
                </div>
            </div>
        )
    }
}