import React from 'react';
import uri from 'urijs';
import Common from '../app/common';
import GithubScraper from '../app/githubScraper';
import GitlabScraper from '../app/gitlabScraper';
import Repositories from './Repositories';

class Content extends React.Component {
  constructor(props) {
    const URI_DATA = uri().query(true);
    const GH_ID = URI_DATA['gh'];
    const GL_ID = URI_DATA['gl'];
    const CM = new Common();

    let user = {};
    let userRepository = [];

    // Get GitHub repositories.
    user = new GithubScraper(GH_ID);
    userRepository = user.getRepository();

    // Get GitLab repositories.
    user = new GitlabScraper(GL_ID);
    userRepository = userRepository.concat(user.getRepository());

    userRepository = CM.sortObjectByOrder(userRepository, 'date', 'desc');

    super(props);
    this.state = {
      userRepository
    };
  }

  render() {
    return (
      <div id="content">
        <div id="activity-graph"></div>
        {this.state.userRepository.map((repo, i) => {
          return (<Repositories
            from = {repo.from}
            name = {repo.name}
            description = {repo.description}
            url = {repo.url}
            key = {i}
          />);
        })}
      </div>
    );
  }
}

export default Content;
