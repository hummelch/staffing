import React, {Component} from 'react';
import PropTypes from 'prop-types';

import WorkloadRow from './WorkloadRow';
import './workload.css';

class WorkloadTable extends Component {

  render() {
    const thead = [<th key={0}>KW</th>];
    for (let x = this.props.from; x <= this.props.to; x++) {
      thead.push(<th key={x}>{x}</th>);
    }

    return (
      <table className="workload">
        <thead>
        <tr>{thead}</tr>
        </thead>
        <tbody>
        {this.props.users.map((user) => (
          <WorkloadRow key={user.id} user={user} from={this.props.from} to={this.props.to}/>
        ))}
        </tbody>
      </table>
    );
  }
}

WorkloadTable.propTypes = {
  from: PropTypes.number.isRequired,
  to: PropTypes.number.isRequired,
  users: PropTypes.array.isRequired
};

export default WorkloadTable;
