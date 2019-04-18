import React from 'react'
import AddProject from './AddProject';
import ViewProject from './ViewProject';

export default class Project extends React.Component{
    render(){
        return(

            <div>
                <div><AddProject></AddProject></div>
                <div><ViewProject></ViewProject></div>
                <div></div>
            </div>
        )
    }
}