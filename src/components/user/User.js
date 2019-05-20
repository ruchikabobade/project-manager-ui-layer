import React from 'react'
import AddUser from './AddUser';
import ViewUser from './ViewUser';

export default class User extends React.Component {
    render(){
        return(
            <div className="row">
            <div className="page-view col-sm-10"><AddUser></AddUser></div>
            <div className="col-sm-2"></div>
            </div>
        )
    }
}