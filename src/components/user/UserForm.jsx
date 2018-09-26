import React, {Component} from 'react';
import {addUser, updateUser} from '../../store/thunks';
import store from '../../store/index';
import './userForm.css';
import {validateFormElement} from "../../staffing/formHelper";

const defaultState = {
  data: {
    id: '',
    name: '',
    days_per_week: 5
  },
  userCustomDays: [],
  app: {
    newUserWasCreated: false
  }
};

class UserForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {...defaultState};
    const globalState = store.getState();

    if (props.location.state && props.location.state.userId) {
      const userForUpdate = globalState.data.users.find(u => props.location.state.userId === u.id);
      if (userForUpdate) {
        this.state.data = userForUpdate;
      }
    }
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.data.id) {
      store.dispatch(updateUser({...this.state.data}));
      this.props.history.push('/');
    } else {
      store.dispatch(addUser({...this.state.data}));
      this.setState({
        ...defaultState,
        app: {
          ...defaultState.app,
          newUserWasCreated: true
        }
      });
    }
  }

  handleChange(event) {
    const inputName = event.target.name;
    let value = validateFormElement(event.target.value, event.target.getAttribute('data-parse'));

    if (inputName === 'days_per_week' && isNaN(value)) {
      value = 0;
    }

    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [inputName]: value
      }
    });
  }

  componentWillUnmount() {
    clearInterval(this.newUserWasCreatedTimeout);
  }

  render() {
    const {id, name, days_per_week} = this.state.data;
    const {newUserWasCreated} = this.state.app;
    const isSubmitDisabled = !name;
    let newUserWasCreatedInfo = '';

    if (newUserWasCreated) {
      newUserWasCreatedInfo =
        <span className="userForm__success"><span role="img" aria-label="">👍</span> User was saved</span>;

      this.newUserWasCreatedTimeout = setTimeout(() => {
        if (this.state.app.newUserWasCreated) {
          this.setState({
            ...this.state,
            app: {
              ...this.state.app,
              newUserWasCreated: false
            }
          });
        }
      }, 6000);
    }

    return (
      <div>
        <form className="userForm">
          <input type="hidden" name="id" value={id}/>
          <div className="grid-container">

            <div className="grid-x grid-padding-x">
              <div className="cell">
                <h4>{id ? `Edit user #${id}` : `Create new user`}</h4>
              </div>

              <div className="medium-6 cell">
                <label>Name *
                  <input
                    name="name"
                    onChange={this.handleChange}
                    value={name}
                    type="text"
                    placeholder="Username"
                    required
                  />
                </label>
              </div>

              <div className="medium-4 cell">
                <label>Days per week (default) *
                  <input
                    name="days_per_week"
                    onChange={this.handleChange}
                    value={days_per_week}
                    type="number"
                    step="0.25"
                    max="7"
                    placeholder="Days per week"
                    data-parse="float"
                    required
                  />
                </label>
              </div>
            </div>

            <div className="button-group">
              <input
                disabled={isSubmitDisabled}
                onClick={this.handleSubmit}
                type="submit"
                className="button"
                value="Submit"
              />
              {newUserWasCreatedInfo}
            </div>

            <p className="help-text">* Required fields</p>
          </div>
        </form>

      </div>
    );
  }
}

export default UserForm;
