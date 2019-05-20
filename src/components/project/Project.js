import React from 'react'
import AddProject from './AddProject';

export default class Project extends React.Component{
    render(){
        return(

            <div className="row">
            <div className="page-view col-sm-10"><AddProject></AddProject></div>
            <div className="col-sm-2"></div>
            </div>
        )
    }
}