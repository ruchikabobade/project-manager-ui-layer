import React from 'react'
import axios from 'axios'
export default class AddTask extends React.Component{
    componentWillMount(){
        this.state = {
            project: "",
            isParent: false,
            startDate: "",
            endDate: "",
            priority: "",
            user: "",
            parentTask : "",
            task: ""
        }
    }
    onChangeProject(e) {
        this.setState({
            project: e.target.value
        });
    }
    onChangeIsParent(e) {
        this.setState({
            isParent: e.target.value
        });
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
            project : this.state.project,
            startDate : this.state.startDate,
            endDate : this.state.endDate,
            priority : this.state.priority,
            user : this.state.user,
            parentTask: this.state.parentTask,
            task: this.state.task
        }
        axios.post('http://localhost:4000/serverport/add', taskRecord)
        .then(res => console.log(res.data));
    }

    render(){
        return(
            <div>
                <form className="form-horizontal" onSubmit={this.onSubmit.bind(this)}>
                    <div class="container">
                        <div class="row">
                            <div class="form-group form-group-sm col-sm-12">
                                <div class="row">
                                    <label class="col-sm-3 col-form-label"> Project: </label>
                                    <div class="col-sm-9">
                                        <input type="text" className="form-control" value={this.state.project} onChange={this.onChangeProject.bind(this)}/>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group form-group-sm col-sm-12">
                                <div class="row">
                                    <label class="col-sm-3 col-form-label">Task: </label>
                                    <div class="col-sm-9">
                                         <input type="text" className="form-control" value={this.state.task} onChange={this.onChangeTask.bind(this)}/>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group form-group-sm col-sm-12">
                                <div class="row">
                                    <input type="checkbox" name="task" value="true"></input>Parent Task
                                </div>
                            </div>
                            <div class="form-group form-group-sm col-sm-12">
                                <div class="row">
                                    <label class="col-sm-3 col-form-label">Priority: </label>
                                    <div class="col-sm-9">
                                        <input type="text" className="form-control" value={this.state.project} onChange={this.onChangeProject.bind(this)}/>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group form-group-sm col-sm-12">
                                <div class="row">
                                    <label class="col-sm-3 col-form-label">Parent Task: </label>
                                    <div class="col-sm-9">
                                        <input type="text" className="form-control" value={this.state.parentTask} onChange={this.onChangeParentTask.bind(this)}/>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group form-group-sm col-sm-12">
                                <div class="row">
                                    <label class="col-sm-3 col-form-label">Start Date: </label>
                                        <input type="date" value= "start date"></input>
                                    <label>End Date: </label>
                                        <input type="date" value= "end date"></input>
                                </div>
                            </div>
                            <div class="form-group form-group-sm col-sm-12">
                                <div class="row">
                                    <label class="col-sm-3 col-form-label">User: </label>
                                    <div class="col-sm-9">
                                        <input type="text" className="form-control" value={this.state.user} onChange={this.onChangeUser.bind(this)}/>
                                    </div>
                                </div>
                            </div>
                    
                            <div className="form-group">
                                <input type="submit" value="Add" className="btn btn-outline-dark"/>
                                <button type="button" className="btn btn-outline-dark" onClick={this.onReset.bind(this)}>Reset</button>
                            </div>
                    </div>
                    </div>
                </form>
            </div>
        )
    }
}