import React from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import ViewProject from "./ViewProject";
import Moment from "moment";
import * as Constants from "../../constants";

const columns = [
  {
    name: "First Name",
    selector: "firstName",
    sortable: true
  },
  {
    name: "Last Name",
    selector: "lastName",
    sortable: true
  },
  {
    name: "Employee ID",
    selector: "employeeId",
    sortable: true
  }
];

const user = {
  userId: 0,
  firstName: "",
  lastName: "",
  employeeId: ""
};

export default class AddProject extends React.Component {
  constructor(props) {
    super(props);
    this.onChangeProject = this.onChangeProject.bind(this);
    this.onChangeSetDate = this.onChangeSetDate.bind(this);
    this.onChangeStartDate = this.onChangeStartDate.bind(this);
    this.onChangePriority = this.onChangePriority.bind(this);
    this.onChangeEndDate = this.onChangeEndDate.bind(this);
    this.filterList = this.filterList.bind(this);

        this.state = {
            project: "",
            setDate: false,
            startDate: Moment(new Date()).format("YYYY-MM-DD"),
            endDate: Moment(new Date()).add(1,'day').format("YYYY-MM-DD"),
            priority: 0,
            manager: "",
            users: [],
            initialUsers:[],
            initialProjects: [],
            projects: [],
            projectStatus : false,
            statusButton: false,
            projectId: 0,
            managerSelected: false
        }
    }
    renderCancel = () => {
      if (this.state.statusButton) {
        return (
          <span className="button-space">
            <input type="submit" id="formSubmit" value="Update"  className="btn btn-outline-dark custom" />
          </span>
        );
      } else {
        return (
          <span className="button-space">
            <input type="submit"  id="formSubmit"  value="Add"  className="btn btn-outline-dark custom"  />
          </span>
        );
      }
    };

  componentWillMount() {
    axios.get(Constants.viewProjectURL).then(response => {
        this.setState({ initialprojects: response.data });
        this.setState({ projects: response.data });
      });
  }

    filterList(e) {
        var updatedList = this.state.initialprojects;
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

    compareBy = (key) => {
        return function (a, b) {
            if (a[key] < b[key]) return 1;
            if (a[key] > b[key]) return -1;
            return 0;
        };
    };
  

  sortList = key => {
    let arrayCopy = [...this.state.projects];
    arrayCopy.sort(this.compareBy(key));
    this.setState({ projects: arrayCopy });
  };

  onChangeProject(e) {
    this.setState({
      project: e.target.value
    });
  };

  onChangeSetDate = () => {
    if (this.state.setDate === true) {
      this.setState({ setDate: false });
    } else {
      this.setState({ setDate: true });
    }
  };
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

    onReset(e) {
        this.setState({
            project: '',
            setDate: false,
            startDate: '',
            endDate: '',
            priority: 0,
            manager: ''
        });
    }

  onSearch = () => {
    axios.get(Constants.viewUserURL).then(response => {
        this.setState({ users: response.data });
        this.setState({ initialUsers: response.data });
      });
  };

    onSubmit(e) {
        e.preventDefault();
        const project = {
            project: this.state.project,
            startDate: this.state.startDate,
            setDate: this.state.setDate,
            endDate: this.state.endDate,
            priority: this.state.priority,
            manager: this.state.manager,
            projectId :this.state.projectId
        }
        const record = {
            taskId: 0,
            task: "",
            user: user,
            project: project
        } 
        const projectRecord = {
            projectId : this.state.projectId,
            project: this.state.project,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            priority: this.state.priority,
            status: this.state.projectStatus
        }

        const updatedRecord = {
          taskId: 0,
            task: "",
            user: user,
            project: projectRecord
        }
        if (this.state.statusButton){
            axios.put(Constants.updateProjectURL, record).then(res => {this.setState((preState)=>{
            return { ...preState, projects: preState.projects.map( data => data.projectId === res.data.projectId  ? res.data : data )}
          })
        });} else {
        axios.post(Constants.addProjectURL, record).then(res => {
        this.setState(preState => {
          const project = res.data && res.data.project;
          return { ...preState, projects: preState.projects.concat(project) };
        });
      });
    }
    this.onReset()
       
  }


  handleChange = state => {
    if(state.selectedRows && state.selectedRows[0]){    
    user.userId = state.selectedRows[0].userId;
    user.firstName = state.selectedRows[0].firstName;
    user.lastName = state.selectedRows[0].lastName;
    user.employeeId = state.selectedRows[0].employeeId;
    const managerName = user.firstName + " " + user.lastName
    this.setState({manager : managerName})
    this.setState({ managerSelected: !this.state.managerSelected });
    }
  };

  suspend = p => {
    axios.delete(Constants.suspendProjectURL +p.projectId).then(res => {
        this.setState((preState)=>{
          return { ...preState, projects: preState.projects.map( data => data.projectId === res.data.projectId  ? res.data : data )}
        })
      });
  };

    update = (p) => {
        const dateIn = this.formatDate(p.startDate)
        const dateIn2 = this.formatDate(p.endDate)
        this.setState({ project: p.project });
        if(p.setDate){
          this.setState({ startDate: dateIn });
          this.setState({ endDate: dateIn2 });
        }
        this.setState({ priority: p.priority });
        this.setState({ manager : p.manager });
        this.setState({ projectId : p.projectId });
        this.setState({ projectStatus : p.status });
        this.setState({ setDate : p.setDate });
        this.setState({ statusButton: true });
    }

  formatDate = inputDate => {
    return Moment(inputDate).format("YYYY-MM-DD");
  };

  submitHandler = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (!this.state.managerSelected) {
      this.setState({ manager: "" });
    }
    if (
      (form && form.checkValidity() === false) ||
      !this.state.managerSelected
    ) {
      event.stopPropagation();
      event.target.className += " was-validated";
    } else if (event.type === "submit") {
      this.onSubmit(event);
      this.setState({ managerSelected: false });
    } 
  };

  render() {
    const rows = [];

    this.state.projects.forEach(project => {
      rows.push(
        <ViewProject
          project={project}
          key={project.project}
          onSelectSuspendProject={this.suspend}
          onSelectEditProject={this.update}
        />
      );
    });
  const { startDate } = this.state;
  const minEndDate = Moment(startDate).add(1, 'day').format('YYYY-MM-DD');

    return (
      <div>
        <div className="form-component">
          <form  className="form-horizontal main-form needs-validation" onSubmit={this.submitHandler} noValidate >
            <div className="container">
              <div className="row">
                <div className="form-group form-group-sm col-sm-12">
                  <div className="row">
                    <label className="col-sm-2 col-form-label">{" "}Project:{" "}</label>
                    <div className="col-sm-10">
                      <input type="text" required className="form-control" value={this.state.project} onChange={this.onChangeProject.bind(this)}/>
                      <div className="invalid-feedback"> *please Project Name</div>
                    </div>
                  </div>
                </div>
                <div className="form-group form-group-sm col-sm-12">
                  <div className="row">
                    <div className="col-sm-2" />
                    <div className="col-sm-4">
                      <input type="checkbox" name="date" value = "StartDate" checked={this.state.setDate} onChange={this.onChangeSetDate.bind(this)}/>{" "}
                      <span className="setDate">Set Start and End Date</span>
                    </div>
                    <div className="col-sm-3">
                      <input type="date" id="startDate" className="form-control" required = { this.state.setDate } disabled = { !this.state.setDate } min={startDate} onChange={this.onChangeStartDate.bind(this)}/>
                      <div className="invalid-feedback"> *please enter Start Date</div>
                    </div>
                    <div className="col-sm-3">
                      <input type="date" id="endDate" className="form-control" disabled = { !this.state.setDate } required = { this.state.setDate } min={minEndDate} onChange={this.onChangeEndDate.bind(this)}/>
                      <div className="invalid-feedback"> *please enter End Date</div>
                    </div>
                  </div>
                </div>
                <div className="form-group form-group-sm col-sm-12">
                  <div className="row">
                    <label className="col-sm-2 col-form-label"> Priority: </label>
                    <div className="col-sm-10 rangeIn">
                      <span>{this.state.priority}</span>
                      <input className="slider" type="range" value={this.state.priority} min="0" max="30" step="1" id="myRange" required onChange={this.onChangePriority.bind(this)}/>
                      <div className="invalid-feedback"> *please enter First Name</div>
                    </div>
                  </div>
                </div>
                <div className="form-group form-group-sm col-sm-12">
                  <div className="row">
                    <label className="col-sm-2 col-form-label"> Manager: </label>
                    <div className="col-sm-8">
                      <input type="text" id="manager" className="form-control" required value={this.state.manager} />
                      <div className="invalid-feedback"> *please select Manager Name</div>
                    </div>
                    <div className="col-sm-2">
                    <button type="button" id="search" className="btn btn-outline-dark btn-block" data-toggle="modal" data-target="#myModal" onClick={this.onSearch}>Search</button>
                    </div>
                  </div>
                </div>
                <div className="form-group form-group-sm col-sm-12">
                  <div className="row">
                    <div className="col-sm-8" />
                    <div className="col-sm-4">
                      {this.renderCancel()}
                      <span className="button-space">{" "}
                        <button type="button" id="reset" className="btn btn-outline-dark custom" onClick={this.onReset.bind(this)}>Reset</button>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="modal fade" id="myModal" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Search Manager</h5>
                <button type="button" className="close" data-dismiss="modal">&times;</button>
              </div>
              <div className="modal-body">
              <div className="col-sm-12">
                  <span>
                    <input className="form-control" type="text" placeholder="Search..." onChange={this.filterUserList.bind(this)}/>
                  </span>
                </div>
                <div>
                <DataTable title="Users Details" columns={columns} data={this.state.users} selectableRows onTableUpdate={this.handleChange}/>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
        <div className="view-component">
          <div>
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <span>
                    <input className="form-control" type="text" placeholder="Search..." onChange={this.filterList.bind(this)}/>
                  </span>
                </div>
              </div>
              <div className="row view-component">
                <span className="col-sm-2">Sort By:</span>
                <span className="col-sm-5">
                  <span className="row">
                    <span className="col-sm-6">
                      <button type="button" id="byStartDate" className="btn btn-outline-dark btn-block " onClick={() => this.sortList("startDate")}>Start Date</button>
                    </span>
                    <span className="col-sm-6">
                      <button type="button" id="byEndDate" className="btn btn-outline-dark btn-block" onClick={() => this.sortList("endDate")}>End Date</button>
                    </span>
                  </span>
                </span>
                <span className="col-sm-5">
                  <span className="row">
                    <span className="col-sm-6">
                      <button type="button" id="byPriority" className="btn btn-outline-dark btn-block" onClick={() => this.sortList("priority")}>Priority</button>
                    </span>{" "}
                    <span className="col-sm-6">
                      <button type="button" id="byCompleted" className="btn btn-outline-dark btn-block" onClick={() => this.sortList("status")} > Completed</button>
                    </span>
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div>{rows}</div>
        </div>
      </div>
    );
  }
}