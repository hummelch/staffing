import React, {Component} from 'react';
import PropTypes from 'prop-types';
import store from '../../store/index';
import './userCustomWeekForm.css';
import {validateFormElement} from "../../staffing/formHelper";
import {config} from "../../config";
import {addUserCustomDay, updateUserCustomDay} from "../../store/thunks";

class UserCustomWeekForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);

    const {user, week} = this.props;
    const globalState = store.getState();

    let userCustomDay = globalState.data.userCustomDays.find(c => c.userId === user.id && c.year === config.year && c.week === week);
    if (!userCustomDay) {
      userCustomDay = {
        id: '',
        userId: user.id,
        year: config.year,
        week: week,
        days: user.days_per_week
      };
    }

    this.state = {
      userCustomDay,
      app: {
        showForm: false,
        showUpdateSuccess: false
      }
    };
  }

  ignoreClick(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  handleClick(e) {
    this.ignoreClick(e);
    this.setState({
      app: {
        ...this.state.app,
        showForm: true
      }
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.userCustomDay.id) {
      store.dispatch(updateUserCustomDay({...this.state.userCustomDay}));
    } else {
      store.dispatch(addUserCustomDay({...this.state.userCustomDay }));
    }

    this.setState({
      app: {
        ...this.state.app,
        showForm: false
      }
    });
  }

  handleChange(event) {
    let days = validateFormElement(event.target.value, event.target.getAttribute('data-parse'));
    if (isNaN(days)) {
      days = 0;
    }

    this.setState({
      userCustomDay: {
        ...this.state.userCustomDay,
        days
      }
    });
  }

  render() {
    const {days} = this.state.userCustomDay;
    const {showForm} = this.state.app;

    const information = (
      <div className="userCustomWeekForm__information">
        Available: {days} TW
        <span role="img" aria-label="edit custom days" onClick={this.handleClick}> ✏️</span>
      </div>
    );

    const form = (
      <div className="userCustomWeekForm__form">
        <form onSubmit={this.handleSubmit}>
          <div className="input-group">
            <span className="input-group-label">TW</span>
            <input value={days.toString()}
                   onClick={this.ignoreClick}
                   onChange={this.handleChange}
                   data-parse="float"
                   className="input-group-field"
                   type="number"
                   pattern="[0-9]+([\.,][0-9]+)?"
                   min="0"
                   max="7"
                   step="0.25"
            />
          </div>
        </form>
      </div>
    );

    return (
      <div className="userCustomWeekForm">
        {showForm ? form : information}
      </div>
    );
  }
}

UserCustomWeekForm.propTypes = {
  user: PropTypes.object,
  week: PropTypes.number
};

export default UserCustomWeekForm;
