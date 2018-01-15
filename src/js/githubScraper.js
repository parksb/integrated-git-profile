import $ from 'jquery';
import request from 'request';

export default class GithubScraper {
  constructor(id) {
    this._id = id;
  }

  getProfile() {
    const login = this._id;
    const url = `https://api.github.com/users/${login}`;

    let userProfile = {
      name: '',
      avatar: '',
      bio: '',
      blog: ''
    };

    request(url, (error, response, data) => {
      if (!error) {
        data = JSON.parse(data);

        userProfile.name = data.name;
        userProfile.avatar = data.avatar;
        userProfile.bio = data.bio;
        userProfile.blog = data.blog;

        return userProfile;
      } else {
        console.log(`[Error] ${error}`);
        return false;
      }
    });
  }

  getRepository() {
    // TODO: Get the user's repositories.
    const login = this._id;
    const url = `https://api.github.com/users/${login}/repos`;
  }

  getContribution() {
    // TODO: Get the history of user's contributing activities.
  }
}
