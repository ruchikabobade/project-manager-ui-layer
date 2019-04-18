import React from 'react'

export default class ViewTask extends React.Component{
    render(){
        return(
            <div>
                <form>
                    <span className="input-item">Project : <input type="text"></input></span>
                    <span>Sort Task By: 
                        <button type="button" className="btn btn-outline-dark">Start Date</button>
                        <button type="button" className="btn btn-outline-dark">End Date</button>
                        <button type="button" className="btn btn-outline-dark">Priority</button>
                        <button type="button" className="btn btn-outline-dark">Completed</button>
                    </span>
                </form>
            </div>
        )
    }
}