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
    window.location.reload();
  }

  render() {
    return (
      <form className="hostForm" onSubmit={this.handleSubmit}>
        <div className="hostForm__error">{this.props.errorMessage}</div>
        <div className="input-group">
          <span className="input-group-label">DB Host</span>
          <input className="input-group-field" type="text" placeholder="Set full host to DB here" defaultValue={config.databaseHost}/>
          <div className="input-group-button">
            <input type="submit" className="button" value="Submit"/>
          </div>
        </div>
      </form>
    );
  }
}

export default connect(mapStateToProps)(HostForm);
