import React from 'react'
import AddProject from './AddProject';

export default class Project extends React.Component{
    render(){
        return(

            <div>
                <div className="page-view"><AddProject></AddProject></div>
            </div>
        )
    }
}