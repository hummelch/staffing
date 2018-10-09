import React, { Component } from 'react';
import { HashRouter, Route, NavLink } from 'react-router-dom';

import {config} from '../../config';
import Dashboard from '../dashboard/Dashboard';
import ProjectForm from '../projects/ProjectForm';
import UserForm from '../user/UserForm';
import ConfigForm from '../host/ConfigForm';

import './navigation.css';

class Navigation extends Component {
  render() {
    return (
      <HashRouter>
        <div>
          <ul className="navigation clearfix">
            <li>⏱ <b>Staffing {config.year}</b></li>
            <li><NavLink exact className="navigation__link" activeClassName="navigation__link--active" to="/">Dashboard</NavLink></li>
            <li><NavLink exact className="navigation__link" activeClassName="navigation__link--active" to="/project">New Project</NavLink></li>
            <li><NavLink exact className="navigation__link" activeClassName="navigation__link--active" to="/user">New User</NavLink></li>
            <li><NavLink exact className="navigation__link" activeClassName="navigation__link--active" to="/config">Config</NavLink></li>
          </ul>

          <main className="content">
            <Route exact path="/" component={Dashboard} />
            <Route path="/project" component={ProjectForm} />
            <Route path="/user" component={UserForm} />
            <Route path="/config" component={ConfigForm} />
          </main>

        </div>
      </HashRouter>
    );
  }
}

export default Navigation;
