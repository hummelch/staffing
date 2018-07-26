import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WorkloadRow extends Component {
  getClassNameByWorkload(daysLeft) {
    if (daysLeft < 0) {
      return 'workload__cell--alert';
    } else if (daysLeft === 0) {
      return 'workload__cell--full';
    } else if (daysLeft <= 1) {
      return 'workload__cell--warning';
    }

    return 'workload__cell--ok';
  }

  render() {
    const { user } = this.props;
    const weeks = Object.assign({}, user.calculated_weeks);
    for (let week in weeks) {
      if (week < this.props.from || week > this.props.to) {
        delete weeks[week];
      }
    }

    return (
      <tr className="workload__row">
        <td className="workload__cell workload__cell--name">{user.name}</td>

        {Object.keys(weeks).map(week => (
          <td key={`${user.id}-${week}`} className={`workload__cell ${this.getClassNameByWorkload(weeks[week].days_left)}`}>
            {weeks[week].days_left}
          </td>
        ))}
      </tr>
    );
  }
}

WorkloadRow.defaultProps = {
  from: 1,
  to: 52
};

WorkloadRow.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number,
  user: PropTypes.object
};

export default WorkloadRow;
