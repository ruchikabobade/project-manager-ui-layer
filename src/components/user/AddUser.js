import React from 'react'

export default class AddUser extends React.Component {
    render(){
        return(
            <div>
                <form>
                    <span className="input-item">First Name : <input type="text" ></input></span>
                    <span className="input-item">Last Name : <input type="text"></input></span>
                    <span className="input-item">Employee ID : <input type="text" ></input></span>
                    <span className="input-item">
                    <button type="button" className="btn btn-outline-dark">Add User</button>
                    <button type="button" className="btn btn-outline-dark">Reset</button>
                    </span>
                </form>
            </div>
        )
    }
}