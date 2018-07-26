import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

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
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/new-project">New Project</Link></li>
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
