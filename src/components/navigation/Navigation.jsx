import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';

import Dashboard from '../dashboard/Dashboard';
import ProjectForm from '../projects/ProjectForm';
import './navigation.css';

class Navigation extends Component {
  render() {
    return (
      <Router>
        <div>
          <ul className="navigation clearfix">
            <li>⏱ <b>Staffing</b></li>
            <li><NavLink exact className="navigation__link" activeClassName="navigation__link--active" to="/">Dashboard</NavLink></li>
            <li><NavLink exact className="navigation__link" activeClassName="navigation__link--active" to="/new-project">New Project</NavLink></li>
          </ul>

          <main className="content">
            <Route exact path="/" component={Dashboard} />
            <Route path="/new-project" component={ProjectForm} />
          </main>
        </div>
      </Router>
    );
  }
}

export default Navigation;
