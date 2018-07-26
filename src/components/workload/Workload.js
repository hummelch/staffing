import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';

import WorkloadRow from './WorkloadRow';
import './workload.css';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import { calculateWorkloadForUser } from '../../staffing/prepareUserData';
import { getWeekNumber } from '../../staffing/dateHelper';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const mapStateToProps = state => {
  const users = state.data.users.map(stateUser => {
    return calculateWorkloadForUser(stateUser, state.data.projects);
  });

  return { users };
};

class Workload extends Component {
  constructor(props) {
    super(props);

    this.rangeOnChange = this.rangeOnChange.bind(this);

    const weeksRange = this.getPersistedWorkloadRange();
    const currentWeek = getWeekNumber();
    const untilWeek = this.getTargetWeek(currentWeek, weeksRange);

    this.state = {
      from: this.props.from || currentWeek,
      to: this.props.to || untilWeek,
      users: this.props.users
    };
  }

  getTargetWeek(currentWeek, weeksRange) {
    const calculatedTargetWeek = currentWeek + weeksRange;
    return calculatedTargetWeek > 52 ? 52 : calculatedTargetWeek;
  }

  getHandleStyle() {
    return {
      height: 20,
      width: 20,
      marginTop: -8,
      borderColor: '#1779ba',
      borderWidth: 3
    };
  }

  getTrackStyle() {
    return {
      backgroundColor: '#1779ba'
    };
  }

  rangeOnChange(sliderRange) {
    const from = sliderRange[0] || 1;
    const to = sliderRange[1] || 52;
    const range = to - from;

    this.persistWorkloadRange(range);
    this.setState({ from, to });
  }

  persistWorkloadRange(days) {
    localStorage.setItem('workloadWeeksRange', days);
  }

  getPersistedWorkloadRange(defaultRange = 6) {
    return parseInt(localStorage.getItem('workloadWeeksRange'), 10) || defaultRange;
  }

  render() {
    const thead = [<th key={0}>KW</th>];
    for (let x = this.state.from; x <= this.state.to; x++) {
      thead.push(<th key={x}>{x}</th>);
    }

    return (
      <div>
        <Range
          min={1}
          max={52}
          defaultValue={[this.state.from, this.state.to]}
          pushable={true}
          tipFormatter={value => `KW ${value}`}
          onChange={this.rangeOnChange}
          handleStyle={[this.getHandleStyle(), this.getHandleStyle()]}
          trackStyle={[this.getTrackStyle(), this.getTrackStyle()]}
        />
        <table className="workload">
          <thead><tr>{thead}</tr></thead>
          <tbody>
            {this.state.users.map((user) => (
              <WorkloadRow key={user.id} user={user} from={this.state.from} to={this.state.to} />
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

Workload.propTypes = {
  from: PropTypes.number,
  to: PropTypes.number,
  users: PropTypes.array
};

export default connect(mapStateToProps)(Workload);
