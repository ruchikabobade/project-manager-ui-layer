import React from 'react'

export default class ViewProject extends React.Component{
    render(){
        return(
            <div>
                <span className="input-item"><input type="text" placeholder="Search..."></input></span>
                <span className="input-item">Sort By:
                <button type="button" className="btn btn-outline-dark">Start Date</button>
                <button type="button" className="btn btn-outline-dark">End Date</button>
                <button type="button" className="btn btn-outline-dark">Priority</button>
                <button type="button" className="btn btn-outline-dark">Completed</button></span>
            </div>
        )
    }
}