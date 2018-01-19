import React from 'react';
import uri from 'urijs';
import GithubScraper from '../app/githubScraper';
import GitlabScraper from '../app/gitlabScraper';
import Repositories from './Repositories';

class Content extends React.Component {
  constructor(props) {
    const uriData = uri().query(true);
    const githubId = uriData['github'];
    const gitlabId = uriData['gitlab'];

    let user = {};
    let userRepository = [];

    user = new GithubScraper(githubId);
    userRepository = user.getRepository();

    user = new GitlabScraper(gitlabId);
    userRepository = userRepository.concat(user.getRepository());

    super(props);
    this.state = {
      userRepository
    };
  }

  render() {
    return (
      <div id="content">
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
