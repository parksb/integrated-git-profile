import $ from 'jquery';

export default class GithubScraper {
  constructor(id) {
    this._id = id;
  }

  // Get the user's profile.
  getProfile(fn) {
    const id = this._id;
    const url = `https://api.github.com/users/${id}`;

    let userProfile = {
      name: '',
      avatar: '',
      bio: ''
    };

    $.getJSON(url, (data) => {
      userProfile.name = data.name;
      userProfile.avatar = data.avatar_url;
      userProfile.bio = data.bio;
      
      fn(userProfile);
    });
  }

  // Get the user's repositories.
  getRepository() {
    const id = this._id;
    const url = `https://api.github.com/users/${id}/repos`;
  }

  // Get the history of user's contributing activities.
  getContribution() {

  }
}
