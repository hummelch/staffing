import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './descriptionList.css';

class DescriptionList extends Component {
  render() {
    return (
      <dl className="descriptionList">
        {this.props.items.map((item, idx) => (
          <React.Fragment key={idx}>
            <dt className="descriptionList__title">{item.title}</dt>
            <dd className="descriptionList__description">{item.description}</dd>
          </React.Fragment>
        ))}
      </dl>
    );
  }
}

DescriptionList.propTypes = {
  items: PropTypes.array
};

export default DescriptionList;
