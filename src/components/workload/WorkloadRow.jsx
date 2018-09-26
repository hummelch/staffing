import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import WorkloadTooltip from './WorkloadTooltip';


class WorkloadRow extends Component {

  constructor(props) {
    super(props);
    this.renderTooltip = this.renderTooltip.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  getClassNameByWorkload(daysLeft, isNotAvailable) {
    if (isNotAvailable && daysLeft === 0) {
      return 'workload__cell--notAvailable';
    } else if (daysLeft < 0) {
      return 'workload__cell--alert';
    } else if (daysLeft === 0) {
      return 'workload__cell--full';
    } else if (daysLeft <= 1) {
      return 'workload__cell--warning';
    }

    return 'workload__cell--ok';
  }

  handleClick(e) {
    e.stopPropagation();
    this.props.onClick(e);
  }

  renderTooltip(id, week) {
    const { tooltip } = this.props;

    if (!tooltip || tooltip.id !== id || parseInt(tooltip.week, 10) !== week) {
      return '';
    }

    return <WorkloadTooltip id={id} week={week} />
  }

  render() {
    const { user } = this.props;
    const weeks = Object.assign({}, user.calculated_weeks);
    for (const week in weeks) {
      if (week < this.props.from || week > this.props.to) {
        delete weeks[week];
      }
    }

    return (
      <tr className="workload__row">
        <td className="workload__cell workload__cell--name">
          {user.name}
          <Link to={{pathname: '/user', state: {userId: user.id}}} className="workload__editLink"> <span role="img" aria-label="edit user">✏️</span></Link>
        </td>

        {Object.keys(weeks).map(week => (
          <td onClick={this.handleClick} data-user-id={user.id} data-week={week} key={`${user.id}-${week}`} className={`workload__cell ${this.getClassNameByWorkload(weeks[week].days_left, weeks[week].is_not_available)}`}>
            {weeks[week].days_left}
            {this.renderTooltip(user.id, parseInt(week, 10))}
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
  user: PropTypes.object,
  tooltip: PropTypes.object
};

export default WorkloadRow;
