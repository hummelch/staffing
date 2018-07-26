import React, { Component } from 'react';
import Workload from '../workload/Workload';
import Projects from '../projects/Projects';

class Dashboard extends Component {
  render() {
    return (
      <div className="dashboard">

        <div className="grid-x grid-padding-x">
          <div className="cell">
            <h4>Team Overview</h4>
            <Workload />
          </div>
        </div>

        <div className="grid-x grid-padding-x">
          <div className="cell large-6">
            <h4>Open projects</h4>
            <Projects staffed={false} />
          </div>
          <div className="cell large-6">
            <h4>Active projects</h4>
            <Projects staffed={true} />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
