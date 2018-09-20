import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink, Redirect } from 'react-router-dom';

import {config} from '../../config';
import Dashboard from '../dashboard/Dashboard';
import ProjectForm from '../projects/ProjectForm';
import './navigation.css';

class Navigation extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul className="navigation clearfix">
            <li>⏱ <b>Staffing {config.year}</b></li>
            <li><NavLink exact className="navigation__link" activeClassName="navigation__link--active" to="/">Dashboard</NavLink></li>
            <li><NavLink exact className="navigation__link" activeClassName="navigation__link--active" to="/new-project">New Project</NavLink></li>
          </ul>

          <main className="content">
            <Route exact path="/" render={() => (
              <Redirect to={`/${new Date().getFullYear()}`}/>
            )}/>
            <Route path="/:year" component={Dashboard} />
            <Route path="/:year/new-project" component={ProjectForm} />
          </main>
        </div>
      </Router>
    );
  }
}

export default Navigation;
