import React from 'react';
import uri from 'urijs';
import GithubScraper from '../app/githubScraper';
import GitlabScraper from '../app/gitlabScraper';

class Header extends React.Component {
  getUserData(fn) {
    // Get GitHub ID and GitLab ID from the uri.
    const uriData = uri().query(true);
    const githubId = uriData['github'];
    // const gitlabId = uriData['gitlab'];

    let ghData = new GithubScraper(githubId);
    // const glData = new GitlabScraper(gitlabId);

    ghData.getProfile(user => {
      console.log(user.name);
    });
  }

  render() {
    const userName = this.getUserData();
    console.log(userName);

    return (
      <h1>Header {userName}</h1>
    );
  }
}

export default Header;
