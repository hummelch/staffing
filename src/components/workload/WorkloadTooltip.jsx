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
    const staffings = [];

    this.props.projects.forEach(project => {
      project.staffings.forEach(staffing => {
        console.log('staffing', staffing);

        if(staffing.user_id === id && staffing.week === parseInt(week, 10)) {
          staffings.push(`${project.name} - ${staffing.days} TW`);
        }
      })
    });

    // TODO Add default days per week OR special days per week

    if(!staffings.length) {
      staffings.push('Nothing staffed yet');
    }

    return (
      <div className="workloadTooltip">
        <div className="workloadTooltip__name">{user.name} - KW {week}</div>
        <ul className="workloadTooltip__list">
          {staffings.map((staffing, idx) => <li className="workloadTooltip__item" key={idx}>{staffing}</li>)}
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
