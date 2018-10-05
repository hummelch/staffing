import React, {Component} from 'react';
import {connect} from 'react-redux';

import Navigation from './components/navigation/Navigation';
import LoadingSpinner from './components/loadingSpinner/LoadingSpinner';
import HostForm from './components/host/HostForm';

const mapStateToProps = state => {
  return {
    isLoading: state.isLoading,
    errorMessage: state.errorMessage
  };
};

class App extends Component {
  render() {
    if (this.props.isLoading) {
      return (
        <div>
          {this.props.errorMessage ? <HostForm /> : ''}
          <LoadingSpinner/>
        </div>
      );
    }

    return (
      <div className="App">
        <Navigation/>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
