import React, { Component } from 'react';
import PropTypes from 'prop-types';

const defaultState = {
  active: null
};

class WorkloadRow extends Component {

  constructor(props) {
    super(props);
    this.handleTooltipClick = this.handleTooltipClick.bind(this);
    this.renderTooltip = this.renderTooltip.bind(this);

    this.state = defaultState;
  }

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

  handleTooltipClick(e) {
    e.preventDefault();

    console.log('click');
    const id = parseInt(e.target.getAttribute('data-user-id'), 10);
    const week = e.target.getAttribute('data-week');

    if(this.state.active && this.state.active.id === id && this.state.active.week === week) {
      this.setState(defaultState);
    } else {
      this.setState({
        active: {
          id: id,
          week: week
        }
      });
    }
  }

  renderTooltip(id, week) {
    if(this.state.active) {
      console.log('render', id, week, this.state.active.id, this.state.active.week);
    }

    if(!this.state.active || this.state.active.id !== id || this.state.active.week !== week) {
      return '';
    }

    return <div className="workload__tooltip">Tooltip for {id} - {week}</div>;
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
          <td onClick={this.handleTooltipClick} data-user-id={user.id} data-week={week} key={`${user.id}-${week}`} className={`workload__cell ${this.getClassNameByWorkload(weeks[week].days_left)}`}>
            {weeks[week].days_left}
            {this.renderTooltip(user.id, week)}
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
