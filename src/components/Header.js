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

    let coverPic = 'https://i.ytimg.com/vi/AZ_1bSwkCnM/maxresdefault.jpg';
    let profilePic = userProfile.avatar;

    return (
      <div id="header">
        <div id="background">
          <h1>{userProfile.name}</h1>
        </div>
        <div id="profile-pic" style={{backgroundImage: `url(${profilePic})`}}></div>
      </div>
    );
  }
}

export default Header;
