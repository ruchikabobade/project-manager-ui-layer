import React from 'react'

export default class ViewUser extends React.Component {
    deleteUser = () => {
        var u = this.props.user
        this.props.onSelectDeleteUser(u)
    }

    updateUser = () => {
        var u = this.props.user
        this.props.onSelectEditUser(u)
    }
    render() {
        const user = this.props.user
        return (

            <div className="viewUser">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9">
                            <input class="form-control" type="text" placeholder={user.firstName} readOnly></input>
                            <input class="form-control" type="text" placeholder={user.lastName} readOnly></input>
                            <input class="form-control" type="text" placeholder={user.employeeId} readOnly></input>
                        </div>
                        <div className="col-sm-3">
                            <button type="button" className="btn btn-outline-dark" onClick={this.updateUser}>Edit</button>
                            <button type="button" className="btn btn-outline-dark" onClick={this.deleteUser}>Delete</button></div>
                    </div>
                </div>
            </div>
        )
    }
}