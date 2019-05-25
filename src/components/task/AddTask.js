import React from 'react'
import axios from 'axios'
import DataTable from 'react-data-table-component'
import { withRouter } from 'react-router-dom';

import Moment from "moment";
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
const taskColumns = [
    {
        name: 'Task Id',
        selector: 'parentId',
        sortable: true,
    },
    {
        name: 'Task',
        selector: 'parentTask',
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
const parentTask = {
    parentId: '',
    parentTask: '',
}
 class AddTask extends React.Component{
    constructor(props) {
        super(props);
        this.onChangeTask = this.onChangeTask.bind(this)
        this.onChangeIsParent = this.onChangeIsParent.bind(this)
        this.onChangeStartDate = this.onChangeStartDate.bind(this)
        this.onChangePriority = this.onChangePriority.bind(this)
        this.onChangeEndDate = this.onChangeEndDate.bind(this)

        this.state = {
            project: "",
            isParent: false,
            startDate: Moment(new Date()).format("YYYY-MM-DD"),
            endDate: Moment(new Date()).add(1,'day').format("YYYY-MM-DD"),
            priority: 0,
            manager: "",
            parentTask : "",
            task : "",
            user :"",
            data:[],
            key : "",
            isUpdate: false, 
            taskId : 0,
            projectSelected: false,
            userSelected: false,
            parentTaskSelected : false,
            users: [],
            initialUsers:[],
            projects:[],
            initialprojects:[],
            ptasks:[],
            initialpTasks:[],
            disableFields:false,
            parentTaskObj:"",
            projectObj:"",
            userObj:""
        }
    }

    componentDidMount(){
        const {id} = this.props.match.params
        if(id){
            this.setState({ isUpdate :true}) 
            axios.get('http://localhost:8080/projectmanager/service/task/viewTaskById/'+ id)
            .then(response => {
                this.setState({ task: response.data.task });
                this.setState({ taskId: id });
                this.setState({ isParent : response.data.isParent})
                if(!this.state.isParent){
                    this.setState({ parentTaskObj : response.data.parentTask})
                    this.setState({ projectObj : response.data.project})
                    this.setState({ userObj : response.data.user})
                    this.setState({ startDate : response.data.startDate})
                    this.setState({ disableFields : true})
                    this.setState({ endDate : response.data.endDate})
                    this.setState({ priority: response.data.priority });
                  } 
            })}else{
            this.setState({ isUpdate :false}) }
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

  filterUserList(e) {
    var updatedList = this.state.initialUsers;
    updatedList = updatedList.filter(function (user) {
        return user.firstName.toLowerCase().search(
            e.target.value.toLowerCase()) !== -1;
    });

   if (updatedList.length > 0) {
     this.setState({ users: updatedList });
   }
}
filterTasksList(e) {
    var updatedList = this.state.initialpTasks;
    updatedList = updatedList.filter(function (task) {
        return task.task.toLowerCase().search(
            e.target.value.toLowerCase()) !== -1;
    });

   if (updatedList.length > 0) {
     this.setState({ ptasks: updatedList });
   }
}
 
    onChangeIsParent = () => {
        if (this.state.isParent === true) {
            this.setState({  isParent: false })
         } else {
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
            priority : 0,
            user : '',
            parentTask :'',
            task: ''
        });
    }

    onSubmit=(e)=>{
        e.preventDefault();
        const taskRecord = {
            startDate : this.state.startDate,
            endDate : this.state.endDate,
            priority : this.state.priority,
            task: this.state.task,
            isParent: this.state.isParent,
            project: project,
            user: user,
            parentTask: parentTask,
            taskId: this.state.taskId
        }
        if(this.state.isUpdate){
            axios.put('http://localhost:8080/projectmanager/service/task/updateTask', taskRecord)
            .then(res => {});
        } else{
        axios.post('http://localhost:8080/projectmanager/service/task/addtask', taskRecord)
        .then(res => {});
        }
    }

    onSearch = (key) => {
        this.setState({ key: key });
        if(key === 'project'){   
            axios.get('http://localhost:8080/projectmanager/service/project/viewProject')
        .then(response => {
            this.setState({ initialProjects: response.data });
            this.setState({ projects: response.data });
            })}
            if(key === 'user'){
        axios.get('http://localhost:8080/projectmanager/service/user/viewUser')
            .then(response => {
                this.setState({ initialUsers: response.data });
                this.setState({ users: response.data });
            })
        }
        if(key === 'parent'){
            axios.get('http://localhost:8080/projectmanager/service/task/viewParentTask')
                .then(response => {
                    this.setState({ ptasks: response.data });
                    this.setState({ initialpTasks: response.data });
                })
            }
    }
    handleChangeUser = (state) => {
        if(state.selectedRows && state.selectedRows[0]){
        user.userId = state.selectedRows[0].userId
        user.firstName = state.selectedRows[0].firstName
        user.lastName = state.selectedRows[0].lastName
        user.employeeId = state.selectedRows[0].employeeId
        const userName = user.firstName + " " + user.lastName
        this.setState({user: userName})
        if(!this.state.isParent)
        this.setState({ userSelected: !this.state.userSelected });
        }
    }

    handleChangeProject = (state) => {
        if(state.selectedRows && state.selectedRows[0]){
        project.projectId = state.selectedRows[0].projectId
        project.project = state.selectedRows[0].project
        project.priority = state.selectedRows[0].priority
        project.startDate = state.selectedRows[0].startDate
        project.endDate = state.selectedRows[0].endDate    
        this.setState({project: project.project})
        if(!this.state.isParent)
        this.setState({ projectSelected: !this.state.projectSelected });
        }
    }

    handleChangeParentTask = (state) => {
        if(state.selectedRows && state.selectedRows[0]){
        parentTask.parentId = state.selectedRows[0].parentId
        parentTask.parentTask = state.selectedRows[0].parentTask
        this.setState({parentTask: parentTask.parentTask})
        if(!this.state.isParent)
        this.setState({ parentTaskSelected: !this.state.parentTaskSelected });
        }
    }
      submitHandler = (event) => {
        const form = event.currentTarget;
        event.preventDefault();
        if (!this.state.userSelected) {
          this.setState({ user: "" });
        }
        if (!this.state.projectSelected) {
            this.setState({ project: "" });
        }
        if (!this.state.parentTaskSelected) {
            this.setState({ parentTask: "" });
        }
        if ((form && form.checkValidity() === false) ) {
          event.stopPropagation();
          event.target.className += " was-validated";
        } else if (event.type == "submit") {
          this.onSubmit(event);
          this.setState({ userSelected: false });
          this.setState({ projectSelected: false });
          this.setState({ parentTaskSelected: false });
        } 
      };

    render(){
        const { startDate, endDate } = this.state;
        const minEndDate = Moment(startDate).add(1, 'day').format('YYYY-MM-DD');
        return(
            <div className="row">
              
            <div className="page-view col-sm-10">
            <div>
                <form className="form-horizontal main-form needs-validation" onSubmit = {this.submitHandler} noValidate >
                    <div className="container">
                        <div className="row">
                            <div className="form-group form-group-sm col-sm-12">
                                <div className="row">
                                    <label className="col-sm-2 col-form-label"> Project: </label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" required value={this.state.project} disabled = {this.state.isParent || this.state.disableFields} />
                                        <div className="invalid-feedback"> *please select Project</div>
                                    </div>
                                    <div className="col-sm-2">
                                            <button type="button" id="search" className="btn btn-outline-dark btn-block" data-toggle="modal" disabled = {this.state.isParent || this.state.disableFields} data-target="#myModal-project" onClick={() => this.onSearch('project')} >Search</button>
                                        </div>
                                </div>
                            </div>
                            <div className="form-group form-group-sm col-sm-12">
                                <div className="row">
                                    <label className="col-sm-2 col-form-label">Task: </label>
                                    <div className="col-sm-10">
                                         <input type="text" id="task" className="form-control" required value={this.state.task} onChange={this.onChangeTask.bind(this)}/>
                                         <div className="invalid-feedback"> *please enter Task</div>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group form-group-sm col-sm-12">
                                <div className="row">
                                <div className="col-sm-2"></div>
                                <div className="col-sm-10">
                                <input type="checkbox" id="isParent" name="date" checked={this.state.isParent} onChange={this.onChangeIsParent.bind(this)} ></input>Parent Task</div>
                                </div>
                            </div>
                            <div className="form-group form-group-sm col-sm-12">
                                <div className="row">
                                    <label className="col-sm-2 col-form-label">Priority: </label>
                                    <div className="col-sm-10 rangeIn">
                                    <span>{this.state.priority}</span>
                                        <input type="range" value={this.state.priority} required min="0" max="30" step="1" disabled = {this.state.isParent} className="slider" id="myRange" onChange={this.onChangePriority.bind(this)} />         
                                        <div className="invalid-feedback"> *please select Priority</div>
                                    </div>
                                    </div>
                            </div>
                            <div className="form-group form-group-sm col-sm-12">
                                <div className="row">
                                    <label className="col-sm-2 col-form-label">Parent Task: </label>
                                    <div className="col-sm-8">
                                        <input type="text" id="parentTask" required className="form-control" disabled = {this.state.isParent} value={this.state.parentTask} />
                                        <div className="invalid-feedback"> *please select ParentTask</div>
                                    </div>
                                    <div className="col-sm-2">
                                            <button type="button" id="search" className="btn btn-outline-dark btn-block" data-toggle="modal" data-target="#myModal-task" onClick={() => this.onSearch('parent')} >Search</button>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group form-group-sm col-sm-12">
                                <div className="row">
                                    <label className="col-sm-2 col-form-label">Start Date: </label>
                                    <div className="col-sm-4"> <input type="date" className="form-control"  required={!this.state.isParent}  defaultValue={startDate} min = {startDate} onChange={this.onChangeStartDate.bind(this)} disabled = {this.state.isParent}></input></div>
                                    <div className="invalid-feedback"> *please select Start Date</div>
                                    <label className="col-sm-2 ">End Date: </label>
                                    <div className="col-sm-4">  <input className="form-control"  required={!this.state.isParent} type="date" defaultValue={endDate} min = {minEndDate} onChange={this.onChangeEndDate.bind(this)} disabled = {this.state.isParent}></input></div>
                                    <div className="invalid-feedback"> *please select End date</div>
                                </div>
                            </div>
                            <div className="form-group form-group-sm col-sm-12">
                                <div className="row">
                                    <label className="col-sm-2 col-form-label">User: </label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" required readOnly = {this.state.isParent || this.state.disableFields} value={this.state.user} />
                                        <div className="invalid-feedback"> *please select User</div>
                                    </div>
                                    <div className="col-sm-2">
                                            <button type="button" id="search" className="btn btn-outline-dark btn-block" disabled = {this.state.isParent  || this.state.disableFields} data-toggle="modal" data-target="#myModal-user" onClick={() => this.onSearch('user')} >Search</button>
                                        </div>
                                </div>
                            </div>
                
                            <div className="form-group form-group-sm col-sm-12">
                                    <div className="row">
                                        <div className="col-sm-8"></div>
                                        <div className="col-sm-4">
                                            <span className="button-space">
                                                {this.state.isUpdate ?  
                                                <input type="submit" id="formSubmit" value="update" className="btn btn-outline-dark custom" />  :
                                                <input type="submit" id="formSubmit" value="Add Task" className="btn btn-outline-dark custom" /> }
                                               </span>
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
                        <h5 className='modal-title'>Search User</h5>
                        <button type='button' className='close' data-dismiss='modal'>&times;</button>
                    </div>
                    <div className='modal-body'>
                    <div className="col-sm-12">
                  <span>
                    <input className="form-control" type="text" placeholder="Search..." onChange={this.filterUserList.bind(this)}/>
                  </span>
                </div>
                        <DataTable
                            title="Users Details"
                            columns={userColumns}
                            data={this.state.users}
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
                        <h5 className='modal-title'>Search Project</h5>
                        <button type='button' className='close' data-dismiss='modal'>&times;</button>
                    </div>
                    <div className='modal-body'>
                    <div className="col-sm-12">
                  <span>
                    <input className="form-control" type="text" placeholder="Search..." onChange={this.filterList.bind(this)}/>
                  </span>
                </div>
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
        <div className="modal fade" id="myModal-task" role="dialog">
            <div className="modal-dialog">
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title'>Search Parent Tasks</h5>
                        <button type='button' className='close' data-dismiss='modal'>&times;</button>
                    </div>
                    <div className='modal-body'>
                    <div className="col-sm-12">
                  <span>
                    <input className="form-control" type="text" placeholder="Search..." onChange={this.filterTasksList.bind(this)}/>
                  </span>
                </div>
                        <DataTable
                            title="Parent Task Details"
                            columns={taskColumns}
                            data={this.state.ptasks}
                            selectableRows
                            onTableUpdate={this.handleChangeParentTask}>
                        </DataTable>
                    </div>
                    <div className='modal-footer'>
                        <button type='button' className='btn btn-default' data-dismiss='modal'>Close</button>
                    </div>
                </div>
            </div>
        </div> 
        </div>
        <div className="col-sm-2"></div>
            </div>
        )
    }
}

export default withRouter(AddTask);