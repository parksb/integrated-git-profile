import React from 'react';
import uri from 'urijs';
import GithubScraper from '../app/githubScraper';
import GitlabScraper from '../app/gitlabScraper';

class Header extends React.Component {
  render() {
    const uriData = uri().query(true);
    const githubId = uriData['github'];
    const gitlabId = uriData['gitlab'];

    // Get GitHub profile
    let user = new GithubScraper(githubId);
    let userProfile = user.getProfile();

    return (
      <div id="header">
        <div id="background">
          <div id="profile-pic" style={{backgroundImage: `url(${userProfile.avatar})`}}></div>
          <h1>{userProfile.name}</h1>
          <h2>{(() => {
            if (user.getProfile.bio !== null) {
              return userProfile.bio;
            }
          })()}</h2>
          <div id="profile-info">
            <div id="info-git">
              <a href={`https://github.com/${githubId}`} target="_blank"><i className="fab fa-github"></i></a>
              <a href={`https://gitlab.com/${gitlabId}`} target="_blank"><i className="fab fa-gitlab"></i></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
