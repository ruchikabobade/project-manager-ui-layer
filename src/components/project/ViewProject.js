import React from 'react'

export default class ViewProject extends React.Component{
    render(){
        const project = this.props.project
        return (

            <div className="viewUser">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9">
                            <input class="form-control" type="text" placeholder={project.project} readOnly></input>
                            {/* <input class="form-control" type="text" placeholder={user.lastName} readOnly></input>
                            <input class="form-control" type="text" placeholder={user.employeeId} readOnly></input> */}
                        </div>
                        <div className="col-sm-3">
                            <button type="button" className="btn btn-outline-dark" >Edit</button>
                            <button type="button" className="btn btn-outline-dark" >Delete</button></div>
                    </div>
                </div>
            </div>
        )
    }
}