import React, { Component } from 'react';
import { connect } from "react-redux";
import ProjectListItem from './ProjectListItem';
import { prepareProjectsData } from '../../staffing/prepareProjectsData';
import './projectListItem.css';

const mapStateToProps = state => {
  const projects = prepareProjectsData(state.data.projects);
  return { projects };
};

class Projects extends Component {
  render() {
    const projects = this.props.staffed ? this.props.projects.staffed : this.props.projects.open;
    return (
      <div className="projects">
        {projects.map(project => (
          <ProjectListItem key={project.id} project={project} />
        ))}
      </div>
    );
  }
}

export default connect(mapStateToProps)(Projects);
