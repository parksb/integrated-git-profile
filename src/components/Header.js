import React from 'react';
import uri from 'urijs';
import GithubScraper from '../app/githubScraper';
import GitlabScraper from '../app/gitlabScraper';

class Header extends React.Component {
  render() {
    const uriData = uri().query(true);
    const githubId = uriData['github'];

    let user = new GithubScraper(githubId);
    let userProfile = user.getProfile();

    return (
      <div id="header">
        <div id="background">
          <h1>{userProfile.name}</h1>
          <h2>{userProfile.bio}</h2>
        </div>
        <div id="profile-pic" style={{backgroundImage: `url(${userProfile.avatar})`}}></div>
      </div>
    );
  }
}

export default Header;
