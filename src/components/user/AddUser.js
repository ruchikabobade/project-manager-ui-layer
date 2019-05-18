import React from 'react'
import axios from 'axios'
import ViewUser from './ViewUser'

export default class AddUser extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeFirstName = this.onChangeFirstName.bind(this)
        this.onChangeLastName = this.onChangeLastName.bind(this)
        this.onChangeEmployeeId = this.onChangeEmployeeId.bind(this)

        this.state = {
            firstName: "",
            lastName: "",
            employeeId: "",
            userId: 0,
            users: [],
            initialUsers: []
        }
    }

    componentWillMount() {
        axios.get('http://localhost:8080/projectmanager/service/user/viewUser')
            .then(response => {
                this.setState({ initialUsers: response.data });
                this.setState({ users: response.data });
            })
    }

    filterList(e) {
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

    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }
    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        });
    }
    onChangeEmployeeId(e) {
        this.setState({
            employeeId: e.target.value
        });
    }

    onReset(e) {
        this.setState({
            firstName: '',
            lastName: '',
            employeeId: ''
        });
    }

    onSubmit(e) {
        e.preventDefault();
        const userRecord = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            employeeId: this.state.employeeId
        }
        axios.post('http://localhost:8080/projectmanager/service/user/addUser', userRecord
        ).then(res => console.log(res.data));

        axios.get('http://localhost:8080/projectmanager/service/user/viewUser')
            .then(response => {
                this.setState({ initialUsers: response.data });
                this.setState({ users: response.data });
            })
    }

    delete = (u) => {
        console.log(u)
        axios.delete('http://localhost:8080/projectmanager/service/user/deleteUser/' + u.userId)
            .then(response => { })
    }

    update = (u) => {
        console.log(u)
        this.setState({ firstName: u.firstName });
        this.setState({ lastName: u.lastName });
        this.setState({ employeeId: u.employeeId });
        this.setState({ userId: u.userId });
    }


    render() {
        const rows = []

        this.state.users.forEach((user) => {
            rows.push(
                <ViewUser user={user}
                    key={user.employeeId} onSelectDeleteUser={this.delete} onSelectEditUser={this.update} />
            )
        });

        return (
            <div>
                <div>
                    <form className="form-horizontal" onSubmit={this.onSubmit.bind(this)}>
                        <div className="container">
                            <div className="row">
                                <div className="form-group form-group-sm col-sm-12">
                                    <div className="row">
                                        <label className="col-sm-3 col-form-label">First Name: </label>
                                        <div className="col-sm-9">
                                            <input type="text" id= "firstName" className="form-control" value={this.state.firstName} onChange={this.onChangeFirstName.bind(this)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group form-group-sm col-sm-12">
                                    <div className="row">
                                        <label className="col-sm-3 col-form-label">Last Name: </label>
                                        <div className="col-sm-9">
                                            <input type="text" id="lastName" className="form-control" value={this.state.lastName} onChange={this.onChangeLastName.bind(this)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group form-group-sm col-sm-12">
                                    <div className="row">
                                        <label className="col-sm-3 col-form-label">Employee ID: </label>
                                        <div className="col-sm-9">
                                            <input type="text" id="employeeId" className="form-control" value={this.state.employeeId} onChange={this.onChangeEmployeeId.bind(this)} />
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group form-group-sm col-sm-12">
                                    <div className="row">
                                        <input type="submit" id="formSubmit" value="Add" className="btn btn-outline-dark" />
                                        <button type="button" className="btn btn-outline-dark" onClick={this.onReset.bind(this)}>Reset</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div>
                    <div>
                        <div className="container">
                            <div className="row">
                                <div className="col-sm-6">
                                    <span><input className="form-control" type="text" id="searchFilter" placeholder="Search..." onChange={this.filterList.bind(this)}></input></span>
                                </div>
                                <div className="col-sm-6">
                                    <span>Sort: <button type="button" id="byFirstName" className="btn btn-outline-dark" onClick={() => this.sortList('firstName')}>First Name</button>
                                        <button type="button" id="byLastName" className="btn btn-outline-dark" onClick={() => this.sortList('lastName')}>Last Name</button>
                                        <button type="button" className="btn btn-outline-dark" onClick={() => this.sortList('employeeId')}>Id</button>
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