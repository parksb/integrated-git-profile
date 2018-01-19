import React from 'react';
import uri from 'urijs';
import GithubScraper from '../app/githubScraper';
import GitlabScraper from '../app/gitlabScraper';
import Repositories from './Repositories';

class Content extends React.Component {
  constructor(props) {
    const uriData = uri().query(true);
    const githubId = uriData['github'];

    let user = new GithubScraper(githubId);
    let userRepository = user.getRepository();

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
            name = {repo.name}
            description = {repo.description}
            key = {i}/>);
        })}
      </div>
    );
  }
}

export default Content;
