import React, { Component } from 'react';
import './loadingSpinner.css';

class LoadingSpinner extends Component {
  render() {
    return (
      <div className="loadingSpinner">
        <svg className="loadingSpinner__spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
          <circle className="loadingSpinner__path" fill="none" strokeWidth="6" strokeLinecap="round" cx="33" cy="33" r="30"></circle>
        </svg>
      </div>
    );
  }
}

export default LoadingSpinner;
