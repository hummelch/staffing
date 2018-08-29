import React, {Component} from 'react';
import {connect} from "react-redux";
import PropTypes from 'prop-types';

import './projectStaffingDetail.css';


const mapStateToProps = state => {
  return {users: state.data.users};
};

class ProjectStaffingDetail extends Component {
  constructor(props) {
    super(props);

    this.handleDetailsToggleClick = this.handleDetailsToggleClick.bind(this);
    this.handleRemoveStaffingClick = this.handleRemoveStaffingClick.bind(this);

    this.state = {
      visible: []
    };
  }

  get combinedUserAndStaffingData() {
    const data = [];

    this.props.staffings.forEach(staffing => {
      const findByUserId = element => element.id === staffing.user_id;

      if(!data.find(findByUserId)) {
        data.push({
          id: staffing.user_id,
          name: this.findNameByUserid(staffing.user_id),
          total: 0,
          staffings: []
        });
      }

      const user = data.find(findByUserId);
      user.total += staffing.days;
      user.staffings.push(staffing);

      user.staffings.sort((a, b) => {
        if (a.week > b.week) {
          return 1;
        }
        if (a.week < b.week) {
          return -1;
        }
        return 0;
      });
    });

    data.sort((a, b) => {
      if (a.name > b.name) {
        return 1;
      }
      if (a.name < b.name) {
        return -1;
      }
      return 0;
    });

    return data;
  }

  handleDetailsToggleClick(e) {
    e.preventDefault();

    const id = parseInt(e.target.getAttribute('data-user-id'), 10);
    const visible = [...this.state.visible];
    const idIndex = visible.indexOf(id);

    if(idIndex !== -1) {
      visible.splice(idIndex, 1);
    } else {
      visible.push(id);
    }

    this.setState({ visible });
  }

  handleRemoveStaffingClick(e) {
    e.preventDefault();
    alert('Implement with Confirm');
  }

  findNameByUserid(id) {
    const user = this.props.users.find(user => user.id === id);
    return user.name;
  };

  render() {
    if (!this.props.staffings.length) {
      return '';
    }

    const {visible} = this.state;

    return (
      <React.Fragment>
        {this.combinedUserAndStaffingData.map(user => (
          <div key={user.id} className="projectStaffingDetail">
            <div onClick={this.handleDetailsToggleClick} data-user-id={user.id} className="projectStaffingDetail__title">
              <span className="projectStaffingDetail__visibilityIndicator">{visible.includes(user.id) ? '-' : '+'}</span>
              {user.name} - {user.total} TW
            </div>
            <ul className={`projectStaffingDetail__details ${visible.includes(user.id) && `projectStaffingDetail__details--visible`}`}>
              {user.staffings.map((staffing, idx) => (
                <li key={idx}>
                  KW {staffing.week} - {staffing.days} TW <span className="projectStaffingDetail__removeStaffingLink" onClick={this.handleRemoveStaffingClick}>🗑</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </React.Fragment>
    );
  }
}

ProjectStaffingDetail.propTypes = {
  staffings: PropTypes.array
};

export default connect(mapStateToProps)(ProjectStaffingDetail);
