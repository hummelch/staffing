import React, { Component } from 'react';
import { Router, Route, NavLink } from 'react-router-dom';

import {config} from '../../config';
import Dashboard from '../dashboard/Dashboard';
import ProjectForm from '../projects/ProjectForm';
import UserForm from '../user/UserForm';
import HostForm from '../host/HostForm';

import './navigation.css';
import createBrowserHistory from 'history/createBrowserHistory';

class Navigation extends Component {
  render() {
    const customHistory = createBrowserHistory();

    return (
      <Router history={customHistory}>
        <div>
          <ul className="navigation clearfix">
            <li>⏱ <b>Staffing {config.year}</b></li>
            <li><NavLink exact className="navigation__link" activeClassName="navigation__link--active" to="/">Dashboard</NavLink></li>
            <li><NavLink exact className="navigation__link" activeClassName="navigation__link--active" to="/project">New Project</NavLink></li>
            <li><NavLink exact className="navigation__link" activeClassName="navigation__link--active" to="/user">New User</NavLink></li>
            <li><NavLink exact className="navigation__link" activeClassName="navigation__link--active" to="/host">DB Host</NavLink></li>
          </ul>

          <main className="content">
            <Route exact path="/" component={Dashboard} />
            <Route path="/project" component={ProjectForm} />
            <Route path="/user" component={UserForm} />
            <Route path="/host" component={HostForm} />
          </main>
        </div>
      </Router>
    );
  }
}

export default Navigation;
