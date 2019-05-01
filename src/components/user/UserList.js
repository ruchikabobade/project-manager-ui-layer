import React from 'react'

export default class ViewUser extends React.Component{
    render(){
        const user = this.props.user
        return(
            <div>
               <div>
                    <span>First Name : {user.firstName}</span>
                    <span>Last Name : {user.lastName}</span>
                    <span>Employee Id : {user.employeeId}</span>
                </div>
                <div>
                <button type="button" className="btn btn-outline-dark">Edit</button>
                <button type="button" className="btn btn-outline-dark">Delete</button>
            </div>
            </div>
        )
    }
}