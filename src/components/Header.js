import React from 'react';
import uri from 'urijs';
import GithubScraper from '../app/githubScraper';
import GitlabScraper from '../app/gitlabScraper';

class Header extends React.Component {
  render() {
    const URI_DATA = uri().query(true);
    const GH_ID = URI_DATA['gh'];
    const GL_ID = URI_DATA['gl'];
    const MAIN_GIT = URI_DATA['m'];

    let user = {};
    let userProfile = {};

    // Get GitHub profile.
    if (MAIN_GIT === 'gh') {
      user = new GithubScraper(GH_ID);
      userProfile = user.getProfile();
    } else { // Get GitLab profile.
      user = new GitlabScraper(GH_ID);
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
              <a href={`https://github.com/${GH_ID}`} target="_blank"><i className="fab fa-github"></i></a>
              <a href={`https://gitlab.com/${GL_ID}`} target="_blank"><i className="fab fa-gitlab"></i></a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
