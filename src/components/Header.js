import React from 'react';
import uri from 'urijs';
import GithubScraper from '../app/githubScraper';
import GitlabScraper from '../app/gitlabScraper';

class Header extends React.Component {
  render() {
    const uriData = uri().query(true);
    const githubId = uriData['gh'];
    const gitlabId = uriData['gl'];
    const mainGit = uriData['m'];

    let user = {};
    let userProfile = {};

    // Get GitHub profile
    if (mainGit === 'gh') {
      user = new GithubScraper(githubId);
      userProfile = user.getProfile();
    } else {
      user = new GitlabScraper(githubId);
      userProfile = user.getProfile();
    }

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
