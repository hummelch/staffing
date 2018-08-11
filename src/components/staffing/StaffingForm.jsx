import React, {Component} from 'react';
import {connect} from "react-redux";
import store from '../../store';
import {addStaffings} from '../../store/thunks';
import WorkloadTable from "../workload/WorkloadTable";
import PropTypes from "prop-types";
import {calculateWorkloadForUser} from "../../staffing/prepareUserData";

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

class StaffingForm extends Component {
  constructor(props) {
    super(props);

    this.handleChangeUser = this.handleChangeUser.bind(this);
    this.handleChangeTw = this.handleChangeTw.bind(this);
    this.handleChangeKwFrom = this.handleChangeKwFrom.bind(this);
    this.handleChangeKwTo = this.handleChangeKwTo.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.defaultState = {
      user: undefined,
      tw: undefined,
      kwFrom: undefined,
      kwTo: undefined,
      isFormReady: false
    };

    this.state = Object.assign({}, this.defaultState);
  }

  handleChangeUser(e) {
    this.setState({user: parseInt(e.target.value, 10)});
  }

  handleChangeTw(e) {
    let tw = parseFloat(e.target.value);
    if (isNaN(tw)) {
      tw = '';
    }
    if (tw && tw > 7) {
      tw = '7';
    }
    this.setState({tw});
  }

  handleChangeKwFrom(e) {
    this.setState({kwFrom: parseInt(e.target.value, 10)});
  }

  handleChangeKwTo(e) {
    this.setState({kwTo: parseInt(e.target.value, 10)});
  }

  handleSubmit(e) {
    e.preventDefault();
    const staffings = [];
    const {user, tw, kwFrom, kwTo} = this.state;

    for (let week = kwFrom; week <= kwTo; week++) {
      staffings.push({
        user_id: user,
        days: tw,
        week
      });
    }

    store.dispatch(addStaffings(this.props.project.id, staffings));
  }

  componentDidUpdate() {
    const {user, tw, kwFrom, kwTo} = this.state;
    const isFormReady = (user && tw && kwFrom && kwTo);
    if (this.state.isFormReady !== isFormReady) {
      this.setState({isFormReady});
    }
  }

  render() {
    const {user, tw, kwFrom, kwTo, isFormReady} = this.state;
    const {project, users} = this.props;

    const userOptions = [<option value="0" key="0">Select Dev</option>];
    for (let user of this.props.users) {
      userOptions.push(<option value={user.id} key={user.id}>{user.name}</option>);
    }

    const kwFromOptions = [<option value="0" key="0">KW Start</option>];
    for (let from = project.start_week; from <= project.end_week; from++) {
      kwFromOptions.push(<option value={from} key={from}>{from}</option>)
    }

    const kwToOptions = [<option value="0" key="0">KW End</option>];
    if (kwFrom) {
      for (let to = kwFrom; to <= project.end_week; to++) {
        kwToOptions.push(<option value={to} key={to}>{to}</option>)
      }
    }

    const conditionalWorkloadTable = user ? (
      <WorkloadTable from={project.start_week} to={project.end_week} users={users.filter(u => user === u.id)}/>
    ) : '';

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="hidden" name="project_id" value={this.props.project.id}/>

          <div className="grid-x grid-padding-x">
            <div className="medium-4 large-7 cell">
              <select value={user} onChange={this.handleChangeUser}>
                {userOptions}
              </select>
            </div>
            <div className="medium-2 large-5 cell">
              <input value={tw} onChange={this.handleChangeTw} placeholder="TW per Week" type="number" min="0.25"
                     max="7"
                     step="0.25"/>
            </div>
            <div className="medium-2 large-4 cell">
              <select value={kwFrom} onChange={this.handleChangeKwFrom}>
                {kwFromOptions}
              </select>
            </div>
            <div className="medium-2 large-4 cell">
              <select value={kwTo} onChange={this.handleChangeKwTo} disabled={!kwFrom}>
                {kwToOptions}
              </select>
            </div>
            <div className="medium-2 large-4 cell">
              <input disabled={!isFormReady} type="submit" className="button" value="Add"/>
            </div>
          </div>
        </form>

        {conditionalWorkloadTable}
      </div>
    )
  }
}

StaffingForm.propTypes = {
  project: PropTypes.object,
  users: PropTypes.array
};

export default connect(mapStateToProps)(StaffingForm);