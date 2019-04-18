import React from 'react'

import {HashRouter, NavLink, Route} from 'react-router-dom'

import Project from './project/Project'
import AddTask from './task/AddTask'
import ViewTask from './task/ViewTask'
import User from './user/User'

export default class ProjectManagerHome extends React.Component {
    render(){
        return(
            <div>
                <div>
                    <h3>Project Manager</h3>
                </div>
          
            <HashRouter>
            <nav className="navbar navbar-expand-sm bg-light">
                <ul className="navbar-nav">
                
                    <li className="nav-item"><NavLink to="/addProject">Add Project</NavLink></li>
                    <li className="nav-item"><NavLink to="/addUser">Add User</NavLink></li>
                    <li className="nav-item"><NavLink to="/addTask">Add Task</NavLink></li>
                    <li className="nav-item"><NavLink to="/viewTask">View Task</NavLink></li>
                </ul>
                </nav>
                <div>
                    <Route path="/addProject" component={Project}></Route>
                    <Route path="/addUser" component={User}></Route>
                    <Route path="/addTask" component={AddTask}></Route>
                    <Route path="/viewTask" component={ViewTask}></Route>
                </div>
          
            </HashRouter>
            </div>
        )
    }
}