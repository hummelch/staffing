import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './workloadTooltip.css';

const mapStateToProps = state => {
  return {
    projects: state.data.projects,
    users: state.data.users
  };
};

class WorkloadTooltip extends Component {
  render() {
    const { id, week } = this.props;

    const user = this.props.users.find(user => user.id === id);
    const projects = this.props.projects.filter(project => project.staffings.find(staffing => staffing.user_id === id && staffing.week === parseInt(week, 10)));
    debugger

    // TODO refactor staffings week to year-week combination - from int to string
    // e.g. 32 to "2018-32"

    return (
      <div className="workloadTooltip">
        <div className="workloadTooltip__name">{user.name} - KW {week}</div>
        <ul>
          {projects.map((project, idx) => <li key={idx}>{project.name}</li>)}
        </ul>
      </div>
    );

  }
}

WorkloadTooltip.propTypes = {
  id: PropTypes.number,
  week: PropTypes.string
};

export default connect(mapStateToProps)(WorkloadTooltip);
