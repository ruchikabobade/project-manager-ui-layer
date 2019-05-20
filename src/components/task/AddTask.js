import React from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component'

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
const userColumns = [
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
    userId: '',
    firstName: '',
    lastName: '',
    employeeId: '',
}
const project = {
    projectId: '',
    project: '',
    startDate: '',
    endDate: '',
    priority: '',
}
export default class AddTask extends React.Component{
    constructor(props) {
        super(props);
        this.onChangeProject = this.onChangeProject.bind(this)
        this.onChangeTask = this.onChangeTask.bind(this)
        this.onChangeParentTask = this.onChangeParentTask.bind(this)
        this.onChangeIsParent = this.onChangeIsParent.bind(this)
        this.onChangeUser = this.onChangeUser.bind(this)
        this.onChangeStartDate = this.onChangeStartDate.bind(this)
        this.onChangePriority = this.onChangePriority.bind(this)
        this.onChangeEndDate = this.onChangeEndDate.bind(this)

        this.state = {
            project: "",
            isParent: false,
            startDate: new Date(),
            endDate: new Date(),
            priority: 10,
            manager: "",
            users: [],
            initialProjects: [],
            projects: [],
            parentTask : "",
            task : "",
            user :"",
            data:[],
            key : ""
        }
    }
    onChangeProject(e) {
        this.setState({
            project: e.target.value
        });
    }
 
    onChangeIsParent = () => {
        if (this.state.isParent === true) {
            this.setState({  isParent: false })
        }
        else {
            this.setState({  isParent: true })
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
    onChangeUser(e) {
        this.setState({
            user: e.target.value
        });
    }
    onChangeParentTask(e) {
        this.setState({
            parentTask: e.target.value
        });
    }
    onChangeTask(e) {
        this.setState({
            task: e.target.value
        });
    }


    onReset(e){
        this.setState({
            project : '',
            isParent : false,
            startDate : '',
            endDate : '',
            priority : '',
            user : '',
            parentTask :'',
            task: ''
        });
    }

    onSubmit(e){
        e.preventDefault();
        const taskRecord = {
            startDate : this.state.startDate,
            endDate : this.state.endDate,
            priority : this.state.priority,
            task: this.state.task,
            isParent: this.state.isParent,
            project: project,
            user: user
        }
        console.log(taskRecord)
        axios.post('http://localhost:8080/projectmanager/service/task/addtask', taskRecord)
        .then(res => console.log(res.data));
    }

    onSearch = (key) => {
        this.setState({ key: key });
        if(key === 'project'){   
            axios.get('http://localhost:8080/projectmanager/service/project/viewProjectByProject/'+ this.state.project)
        .then(response => {
            this.setState({ data: response.data });
            })}
        else{
        axios.get('http://localhost:8080/projectmanager/service/user/viewUserByFirstName/'+this.state.user)
            .then(response => {
                this.setState({ data: response.data });
            })
        }
    }
    handleChangeUser = (state) => {
        user.userId = state.selectedRows[0].userId
        user.firstName = state.selectedRows[0].firstName
        user.lastName = state.selectedRows[0].lastName
        user.employeeId = state.selectedRows[0].employeeId
        console.log('Selected Rows: ', state.selectedRows);
        console.log(user);
    }

    handleChangeProject = (state) => {
        project.projectId = state.selectedRows[0].projectId
        project.project = state.selectedRows[0].project
        project.priority = state.selectedRows[0].priority
        project.startDate = state.selectedRows[0].startDate
        project.endDate = state.selectedRows[0].endDate
        console.log('Selected Rows: ', state.selectedRows);
        console.log(project);
    }
    render(){
        return(
            <div className="page-view">
            <div>
                <form className="form-horizontal" onSubmit={this.onSubmit.bind(this)}>
                    <div class="container">
                        <div class="row">
                            <div class="form-group form-group-sm col-sm-12">
                                <div class="row">
                                    <label class="col-sm-2 col-form-label"> Project: </label>
                                    <div class="col-sm-8">
                                        <input type="text" className="form-control" value={this.state.project} onChange={this.onChangeProject.bind(this)}/>
                                    </div>
                                    <div class="col-sm-2">
                                            <button type="button" id="search" className="btn btn-outline-dark btn-block" data-toggle="modal" data-target="#myModal-project" onClick={() => this.onSearch('project')} >Search</button>
                                        </div>
                                </div>
                            </div>
                            <div class="form-group form-group-sm col-sm-12">
                                <div class="row">
                                    <label class="col-sm-2 col-form-label">Task: </label>
                                    <div class="col-sm-10">
                                         <input type="text" className="form-control" value={this.state.task} onChange={this.onChangeTask.bind(this)}/>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group form-group-sm col-sm-12">
                                <div class="row">
                                <div class="col-sm-2"></div>
                                <div class="col-sm-10">
                                <input type="checkbox"
                                            name="date"
                                            checked={this.state.isParent}
                                            onChange={this.onChangeIsParent.bind(this)} >
                                        </input>Parent Task
                                        </div>
                                </div>
                            </div>
                            <div class="form-group form-group-sm col-sm-12">
                                <div class="row">
                                    <label class="col-sm-2 col-form-label">Priority: </label>
                                    <div class="col-sm-10 rangeIn">
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
                                    <label class="col-sm-2 col-form-label">Parent Task: </label>
                                    <div class="col-sm-8">
                                        <input type="text" className="form-control" value={this.state.parentTask} onChange={this.onChangeParentTask.bind(this)}/>
                                    </div>
                                    <div class="col-sm-2">
                                            <button type="button" id="search" className="btn btn-outline-dark btn-block" data-toggle="modal" data-target="#myModal" onClick={() => this.sortList('parentTask')} >Search</button>
                                        </div>
                                </div>
                            </div>
                            <div class="form-group form-group-sm col-sm-12">
                                <div class="row">
                                    <label class="col-sm-2 col-form-label">Start Date: </label>
                                    <div class="col-sm-4"> <input type="date" defaultValue={this.state.startDate} onChange={this.onChangeStartDate.bind(this)}></input></div>
                                    <label className="col-sm-2 ">End Date: </label>
                                    <div class="col-sm-4">  <input type="date" defaultValue={this.state.endDate} onChange={this.onChangeEndDate.bind(this)}></input></div>
                                </div>
                            </div>
                            <div class="form-group form-group-sm col-sm-12">
                                <div class="row">
                                    <label class="col-sm-2 col-form-label">User: </label>
                                    <div class="col-sm-8">
                                        <input type="text" className="form-control" value={this.state.user} onChange={this.onChangeUser.bind(this)}/>
                                    </div>
                                    <div class="col-sm-2">
                                            <button type="button" id="search" className="btn btn-outline-dark btn-block" data-toggle="modal" data-target="#myModal-user" onClick={() => this.onSearch('user')} >Search</button>
                                        </div>
                                </div>
                            </div>
                
                            <div class="form-group form-group-sm col-sm-12">
                                    <div className="row">
                                        <div className="col-sm-8"></div>
                                        <div className="col-sm-4">
                                            <span className="button-space">
                                                <input type="submit" id="formSubmit" value="Add Task" className="btn btn-outline-dark custom" /></span>
                                            <span className="button-space">  <button type="button" id="reset" className="btn btn-outline-dark custom" onClick={this.onReset.bind(this)}>Reset</button></span>
                                        </div>
                                    </div>
                                </div>
                    </div>
                    </div>
                </form>
            </div>
            <div className="modal fade" id="myModal-user" role="dialog">
            <div className="modal-dialog">
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title'>Search Manager</h5>
                        <button type='button' className='close' data-dismiss='modal'>&times;</button>
                    </div>
                    <div className='modal-body'>
                        <DataTable
                            title="Users Details"
                            columns={userColumns}
                            data={this.state.data}
                            selectableRows
                            onTableUpdate={this.handleChangeUser}>
                        </DataTable>
                    </div>
                    <div className='modal-footer'>
                        <button type='button' className='btn btn-default' data-dismiss='modal'>Close</button>
                    </div>
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
                        <DataTable
                            title="Project Details"
                            columns={projectColumns}
                            data={this.state.data}
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
        </div>
        )
    }
}