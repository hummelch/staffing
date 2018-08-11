import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';

import WorkloadTable from './WorkloadTable';

import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import {calculateWorkloadForUser} from '../../staffing/prepareUserData';
import {getWeekNumber} from '../../staffing/dateHelper';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

const mapStateToProps = state => {
  const users = state.data.users.map(stateUser => {
    return calculateWorkloadForUser(stateUser, state.data.projects);
  }).sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  return {users};
};

class Workload extends Component {

  constructor(props) {
    super(props);

    this.rangeOnChange = this.rangeOnChange.bind(this);

    const currentWeek = getWeekNumber();
    const untilWeek = this.getTargetWeek(currentWeek);
    const {from, to} = this.getPersistedWorkloadRange(currentWeek, untilWeek);

    this.state = {
      from: this.props.from || from,
      to: this.props.to || to
    };
  }

  static handleStyle = {
    height: 20,
    width: 20,
    marginTop: -8,
    borderColor: '#1779ba',
    borderWidth: 3
  };

  static trackStyle = {
    backgroundColor: '#1779ba'
  };

  getTargetWeek(currentWeek, defaultWeeksRange = 5) {
    const calculatedTargetWeek = currentWeek + defaultWeeksRange;
    return calculatedTargetWeek > 52 ? 52 : calculatedTargetWeek;
  }

  rangeOnChange(sliderRange) {
    const from = sliderRange[0] || 1;
    const to = sliderRange[1] || 52;

    this.persistWorkloadRange(from, to);
    this.setState({from, to});
  }

  persistWorkloadRange(from, to) {
    window.sessionStorage.setItem('workloadWeeksRangeFrom', from);
    window.sessionStorage.setItem('workloadWeeksRangeTo', to);
  }

  getPersistedWorkloadRange(defaultFrom = 1, defaultTo = 52) {
    const from = parseInt(window.sessionStorage.getItem('workloadWeeksRangeFrom'), 10) || defaultFrom;
    const to = parseInt(window.sessionStorage.getItem('workloadWeeksRangeTo'), 10) || defaultTo;

    return {from, to};
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
          handleStyle={[Workload.handleStyle, Workload.handleStyle]}
          trackStyle={[Workload.trackStyle, Workload.trackStyle]}
        />
        <WorkloadTable from={this.state.from} to={this.state.to} users={this.props.users} />
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
