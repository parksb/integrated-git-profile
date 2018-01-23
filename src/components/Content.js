import React from 'react';
import uri from 'urijs';
import GithubScraper from '../app/githubScraper';
import GitlabScraper from '../app/gitlabScraper';
import Repositories from './Repositories';

class Content extends React.Component {
  constructor(props) {
    const uriData = uri().query(true);
    const githubId = uriData['gh'];
    const gitlabId = uriData['gl'];

    let user = {};
    let userRepository = [];

    // Get GitHub repo
    user = new GithubScraper(githubId);
    userRepository = user.getRepository();

    // Get GitLab repo
    user = new GitlabScraper(gitlabId);
    userRepository = userRepository.concat(user.getRepository());

    // Sort by last activity date
    userRepository.sort((a, b) => {
      if (a.date < b.date) {
        return 1;
      } else if (a.date > b.date) {
        return -1;
      } else {
        return 0;
      }
    });

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
