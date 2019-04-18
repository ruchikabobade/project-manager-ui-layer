import React from 'react'

export default class AddProject extends React.Component {
    render(){
        return(
            <div>
                <form>
                    <span className="input-item">Project : <input type="text"></input></span>
                    <span className="input-item">Priority : <input type="range" min="0" max="30" value="20" className="slider" id="myRange"></input></span>
                    <span className="input-item">Manager : <input type="text"></input></span>
                    <span className="input-item"><button type="button" className="btn btn-outline-dark">Add</button>
                    <button type="button" className="btn btn-outline-dark">Reset</button></span>
                </form>
            </div>
        )
    }
}