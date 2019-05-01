import React from 'react'
import axios from 'axios'

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
           users: []
        }
    }
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
        axios.get('http://localhost:8080/projectmanager/service/user/viewUser')
      .then(response => {
        this.setState({ users: response.data });
      })
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
        this.setState({
            isShowing: true
        });
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
        const user = {
            userId: 1,
            firstName: "polo",
            lastName: "xyz"
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

    render() {
        let rows =[]
        rows = (this.props.users === undefined) ? [] : this.props.users.map((user) =>{
            <ViewUsersContainer
            kay={'user-' + user.id}
            user = {user}></ViewUsersContainer>
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
                                        <input type="date" defaultValue={this.state.startDate} onChange={this.onChangeStartDate.bind(this)}></input>
                                    </div>
                                    <div class="col-sm-4">
                                        <input type="date" defaultValue={this.state.endDate} onChange={this.onChangeEndDate.bind(this)}></input>
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
                                        <input type="text" className="form-control" value={this.state.manager} onChange={this.onChangeManager.bind(this)} />
                                    </div>
                                    <div class="col-sm-2">
                                   
                                        <button type="button" className="btn btn-outline-dark" data-toggle="modal" data-target="#myModal">Search</button>
                                       
                                    </div>
                                </div>
                            </div>
                            <div class="form-group form-group-sm col-sm-12">
                                <div class="row">
                                    <input type="submit" value="Add" className="btn btn-outline-dark" />
                                    <button type="button" className="btn btn-outline-dark" onClick={this.onReset.bind(this)}>Reset</button>
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