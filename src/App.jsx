import React, { Component } from 'react';
import { connect } from 'react-redux';

import Navigation from './components/navigation/Navigation';
import LoadingSpinner from './components/loadingSpinner/LoadingSpinner';

const mapStateToProps = state => {
  return { isLoading: state.isLoading };
};

class App extends Component {
  render() {
    if (this.props.isLoading) {
      return (
        <LoadingSpinner />
      );
    }

    return (
      <div className="App">
        <Navigation />
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
