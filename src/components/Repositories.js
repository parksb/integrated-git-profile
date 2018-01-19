import React from 'react';

class Repositories extends React.Component {
  render() {
    return (
      <a href={`https://github.com/ParkSB/${this.props.name}`}>
      <div className="repo-card">
        <h1 className="repo-name">{this.props.name}</h1>
        <h2 className="repo-description">{this.props.description}</h2>
      </div>
      </a>
    );
  }
}

export default Repositories;
