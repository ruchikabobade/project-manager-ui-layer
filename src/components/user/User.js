import React from 'react'
import AddUser from './AddUser';
import ViewUser from './ViewUser';

export default class User extends React.Component {
    render(){
        return(
            <div>
            <div className="user"><AddUser></AddUser></div>
            </div>
        )
    }
}