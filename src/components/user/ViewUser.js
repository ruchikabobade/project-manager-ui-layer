import React from 'react'

export default class ViewUser extends React.Component{
    render(){
        return(
            <div>
                <form>
                    <span><input type="text" placeholder="Search..."></input></span>
                    <span>Sort: <button type="button" className="btn btn-outline-dark">First Name</button>
                    <button type="button" className="btn btn-outline-dark">Last Name</button>
                    <button type="button" className="btn btn-outline-dark">Id</button>
                    </span> 

                </form>
            </div>
        )
    }
}