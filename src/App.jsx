import React, {Component} from 'react';
import {connect} from 'react-redux';

import Navigation from './components/navigation/Navigation';
import LoadingSpinner from './components/loadingSpinner/LoadingSpinner';
import HostForm from './components/host/HostForm';
import localPackage from '../package.json';
import IdleTimer from 'react-idle-timer'
import {config} from './config';
import store from "./store";
import {loadDb} from "./store/thunks";
import {loadDbBegin} from "./store/actions";

const mapStateToProps = state => {
  return {
    isLoading: state.isLoading,
    errorMessage: state.errorMessage
  };
};

class App extends Component {
  constructor(props) {
    super(props);

    this.idleTimer = null;
    this.onActive = this._onActive.bind(this);
    this.onIdle = this._onIdle.bind(this);
  }

  _onActive(e) {
    store.dispatch(loadDb());
  }

  _onIdle(e) {
    store.dispatch(loadDbBegin());
  }

  render() {
    return (
      <div className="app">
        <IdleTimer
          ref={ref => {
            this.idleTimer = ref;
          }}
          element={document}
          onActive={this.onActive}
          onIdle={this.onIdle}
          timeout={1000 * config.idleReloadSeconds}>

          {this.props.isLoading ? (
            <div>
              {this.props.errorMessage ? <HostForm/> : ''}
              <LoadingSpinner/>
            </div>
          ) : <Navigation/>}

          <footer>
            Staffing App {localPackage.version}
          </footer>
        </IdleTimer>
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
