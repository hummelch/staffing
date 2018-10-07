import React, {Component} from 'react';
import {connect} from 'react-redux';

import './hostForm.css';
import {config} from '../../config';

const mapStateToProps = state => {
  return {
    isLoading: state.isLoading,
    errorMessage: state.errorMessage
  };
};

class HostForm extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    window.localStorage.setItem('databaseHost', e.target[0].value);
    window.localStorage.setItem('year', e.target[1].value);
    window.location.reload();
  }

  render() {
    const yearOptions = [];
    for (let y = 2018; y <= 2025; y++) {
      yearOptions.push(<option key={y} value={y}>{y}</option>);
    }

    return (
      <form className="hostForm" onSubmit={this.handleSubmit}>
        <div className="grid-container">
          <div className="grid-x grid-padding-x">
            <div className="cell hostForm__error">{this.props.errorMessage}</div>

            <div className="cell large-8">
              <label>DB Host URL
                <input type="text" placeholder="Set full host to DB here" defaultValue={config.databaseHost}/>
              </label>
            </div>

            <div className="cell large-4">
              <label>Year
                <select defaultValue={config.year}>
                  {yearOptions}
                </select>
              </label>
            </div>
          </div>

          <div className="cell">
            <input type="submit" className="button" value="Submit"/>
          </div>
        </div>
      </form>
    );
  }
}

export default connect(mapStateToProps)(HostForm);
