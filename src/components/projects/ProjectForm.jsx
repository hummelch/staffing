import React, { Component } from 'react';
import { getWeekNumber } from '../../staffing/dateHelper';
import { PROJECT_STATUS, getProjectStatusTranslation } from '../../staffing/projectStatus';
import { addProject, updateProject } from '../../store/thunks';
import store from '../../store';
import PropTypes from 'prop-types';

const defaultState = {
  id: null,
  customer: '',
  name: '',
  number: '',
  status: PROJECT_STATUS.ORDERED,
  manager: '',
  developer: '',
  description: '',
  estimation_days: null,
  start_week: getWeekNumber(),
  end_week: null,
  closed: false,
  staffings: []
};

class ProjectForm extends Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = (props.location.state && props.location.state.project) ? props.location.state.project : defaultState;
  }

  handleSubmit(e) {
    e.preventDefault();

    if(this.state.id) {
      store.dispatch(updateProject(this.state));
    } else {
      store.dispatch(addProject(this.state));
    }
  }

  handleChange(event) {
    const inputName = event.target.name;
    let value = event.target.value;

    switch (event.target.getAttribute('data-parse')) {
      case 'integer':
        value = parseInt(value, 10);
        break;

      case 'float':
        value = parseFloat(value);
        break;

      default:
    }

    this.setState({ [inputName]: value });
  }

  componentDidUpdate() {
    if (this.state.end_week && this.state.end_week < this.state.start_week) {
      this.setState({ end_week: null })
    }
  }

  render() {
    const { id, customer, name, estimation_days, start_week, end_week } = this.state;
    const isSubmitDisabled = !(customer && name && estimation_days && start_week && end_week);

    const startingWeekOptions = Array.from(Array(52).keys()).map(index => {
      const week = index + 1;
      return <option key={week} value={week}>{week}</option>;
    });

    const endingWeekOptions = [<option key="0" value="">Select End Week</option>];
    if (start_week) {
      for (let week = start_week; week <= 52; week++) {
        endingWeekOptions.push(<option key={week} value={week}>{week}</option>)
      }
    }

    return (
      <form>
        <input type="hidden" name="id" defaultValue={id} />
        <div className="grid-container">

          <div className="grid-x grid-padding-x">
            <div className="cell">
              <h4>{id ? `Edit project #${id}` : `Create new project`}</h4>
            </div>

            <div className="cell">
              <label>Customer *
                <input
                  name="customer"
                  onChange={this.handleChange}
                  defaultValue={this.state.customer}
                  type="text"
                  placeholder="Customer name"
                  required
                />
              </label>
            </div>

            <div className="medium-6 cell">
              <label>Project Name *
                <input
                  name="name"
                  onChange={this.handleChange}
                  defaultValue={this.state.name}
                  type="text"
                  placeholder="Project name"
                  required
                />
              </label>
            </div>

            <div className="medium-3 cell">
              <label>Project Number
                <input
                  name="number"
                  onChange={this.handleChange}
                  defaultValue={this.state.number}
                  type="text"
                  placeholder="Teambox project number"
                />
              </label>
            </div>

            <div className="medium-3 cell">
              <label>Project Status
              <select
                  name="status"
                  onChange={this.handleChange}
                  defaultValue={this.state.status}
                >
                  <option value={PROJECT_STATUS.ORDERED}>{getProjectStatusTranslation(PROJECT_STATUS.ORDERED)}</option>
                  <option value={PROJECT_STATUS.HOLD}>{getProjectStatusTranslation(PROJECT_STATUS.HOLD)}</option>
                  <option value={PROJECT_STATUS.BLOCKER}>{getProjectStatusTranslation(PROJECT_STATUS.BLOCKER)}</option>
                </select>
              </label>
            </div>

            <div className="medium-6 cell">
              <label>Project Manager
                <input
                  name="manager"
                  onChange={this.handleChange}
                  defaultValue={this.state.manager}
                  type="text"
                  placeholder="Project Manager name"
                />
              </label>
            </div>

            <div className="medium-6 cell">
              <label>Favored Developer
                <input
                  name="developer"
                  onChange={this.handleChange}
                  defaultValue={this.state.developer}
                  type="text"
                  placeholder="Favored Developer name"
                />
              </label>
            </div>

            <div className="cell">
              <label>Description
                <textarea
                  name="description"
                  onChange={this.handleChange}
                  defaultValue={this.state.description}
                  placeholder="Additional informations about the project like Jira/Confluence/VSTS Links..."
                  style={{ height: '10rem' }}
                ></textarea>
              </label>
            </div>

            <div className="medium-4 cell">
              <label>Estimated working days *
                <input
                  name="estimation_days"
                  onChange={this.handleChange}
                  defaultValue={this.state.estimation_days}
                  type="number"
                  step="0.25"
                  placeholder="Days"
                  data-parse="float"
                  required
                />
              </label>
            </div>

            <div className="medium-4 cell">
              <label>Starting Week (KW) *
                <select
                  name="start_week"
                  onChange={this.handleChange}
                  defaultValue={this.state.start_week}
                  data-parse="integer"
                  required
                >
                  {startingWeekOptions}
                </select>
              </label>
            </div>

            <div className="medium-4 cell">
              <label>Ending Week (KW) *
                <select
                  name="end_week"
                  onChange={this.handleChange}
                  defaultValue={this.state.end_week}
                  disabled={!this.state.start_week}
                  data-parse="integer"
                  required
                >
                  {endingWeekOptions}
                </select>
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
          </div>

          <p className="help-text">* Required fields</p>
        </div>
      </form>
    );
  }
}

ProjectForm.propTypes = {
  project: PropTypes.object
};

export default ProjectForm;
