import React from 'react';

class Repositories extends React.Component {
  render() {
    return (
      <div className="repo-body">
        <a href={this.props.url} target="_blank">
          <div className="repo-card">
            <h1 className="repo-name">
              <span className={`repo-from repo-from-${this.props.from}`}>{this.props.from}</span>
              {this.props.name}
            </h1>
            <h2 className="repo-description">{this.props.description}</h2>
          </div>
        </a>
      </div>
    );
  }
}

export default Repositories;
