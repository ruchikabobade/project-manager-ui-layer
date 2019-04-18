import React from 'react'

export default class AddTask extends React.Component{
    render(){
        return(
            <div>
                <form>
                    <span className="input-item">Project : <input type="text"></input></span>
                    <span className="input-item">Task : <input type="text"></input></span>
                    <span className="input-item">Priority: <input type="range" min="0" max="30" value="20" className="slider"></input></span>
                    <span className="input-item">Parent Task : <input type="text"></input></span>
                    <span className="input-item">Start Date: <input type="date"></input>
                    End Date: <input type="date"></input></span>
                    <span className="input-item">User : <input type="text"></input></span>
                    <span className="input-item">
                    <button type="button" className="btn btn-outline-dark">Add Task</button>
                    <button type="button" className="btn btn-outline-dark">Reset</button></span>
                </form>
            </div>
        )
    }
}