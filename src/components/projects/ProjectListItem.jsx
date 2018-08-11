import React, {Component} from 'react';
import store from '../../store';
import {closeProject} from '../../store/thunks';
import PropTypes from 'prop-types';

import StaffingForm from '../staffing/StaffingForm';
import {Tab, Tabs, TabList, TabPanel} from 'react-tabs';
import './react-tabs.css';

class ProjectListItem extends Component {
  constructor(props) {
    super(props);

    this.handleCloseProject = this.handleCloseProject.bind(this);
    this.toggleStaffProject = this.toggleStaffProject.bind(this);
    this.toggleDetail = this.toggleDetail.bind(this);

    this.state = {
      isClosing: false,
      isDetailVisible: false,
      tabIndex: 0
    };
  }

  handleCloseProject(e) {
    e.preventDefault();

    if (window.confirm(`Really close project "${this.props.project.name}"?`)) {
      this.setState({isClosing: true});
      store.dispatch(closeProject(this.props.project.id));
    }
  }

  toggleStaffProject(e) {
    e.preventDefault();
    this.setState({
      isDetailVisible: true,
      tabIndex: 2
    });
  }

  toggleDetail(e) {
    e.preventDefault();
    this.setState({
      isDetailVisible: !this.state.isDetailVisible
    });
  }

  render() {
    const {project} = this.props;
    const {isClosing, isDetailVisible, tabIndex} = this.state;

    if (isClosing) {
      return (
        <div className="projectListItem">
          <div>Project is closing...</div>
        </div>
      );
    }

    const staffedDays = project.staffings.reduce((acc, val) => acc + val.days, 0);
    const timingPanel = (
      <div>
        <div>
          KW {project.start_week}{project.start_week !== project.end_week && ` - ${project.end_week}`}
        </div>
        <div>
          {project.estimation_days} TW ({staffedDays} TW staffed)
        </div>
      </div>
    );

    let staffingPanel = '';
    if (project.staffings.length) {
      const state = store.getState();
      const findNameByUserid = (id) => {
        const user = state.data.users.find(user => user.id === id);
        return user.name;
      };

      staffingPanel = (
        <ul>
          {project.staffings.map((staffing, index) => (
            <li key={index}>{findNameByUserid(staffing.user_id)}: KW {staffing.week} => {staffing.days} TW</li>
          ))}
        </ul>
      );
    }

    return (
      <div className="projectListItem callout">

        <button className="projectListItem__closeButton close-button" onClick={this.handleCloseProject} type="button">
          <span aria-hidden="true">&times;</span>
        </button>

        <div className="projectListItem__title">
          <button className="projectListItem__toggleDetailButton" onClick={this.toggleDetail} type="button">
            {isDetailVisible ? '-' : '+'}
          </button>
          { staffedDays > project.estimation_days ? '' : (
            <a className="projectListItem__staffButton button small small-only-expanded success"
               onClick={this.toggleStaffProject}>Staff
            </a>
          ) }
          <span className="projectListItem__name">{project.name}</span>
        </div>

        <div class={`projectListItem__${isDetailVisible ? 'detailVisible' : 'detailHidden'}`}>
          <Tabs selectedIndex={tabIndex} onSelect={tabIndex => this.setState({tabIndex})}>
            <TabList>
              <Tab>Timing</Tab>
              <Tab>Task</Tab>
              <Tab>
                Staffing ({staffedDays} of {project.estimation_days} TW)
                {staffedDays > project.estimation_days ? ' ❗' : ''}
              </Tab>
            </TabList>

            <TabPanel>
              {timingPanel}
            </TabPanel>
            <TabPanel>
              <p>{project.description}</p>
            </TabPanel>
            <TabPanel>
              <StaffingForm project={project}/>
              {staffingPanel}
            </TabPanel>
          </Tabs>
        </div>
      </div>
    );
  }
}

ProjectListItem.propTypes = {
  project: PropTypes.object
};

export default ProjectListItem;
