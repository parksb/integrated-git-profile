import $ from 'jquery';

class GithubScraper {
  constructor(id) {
    this._id = id;
  }

  // Get the user's profile.
  getProfile() {
    const id = this._id;
    const url = `https://api.github.com/users/${id}`;

    const data = JSON.parse($.ajax({
      url: url,
      dataType: 'JSON',
      async: false
    }).responseText);

    let userProfile = {
      name: '',
      avatar: '',
      bio: ''
    };

    userProfile.name = data.name;
    userProfile.avatar = data.avatar_url;
    userProfile.bio = data.bio;

    return userProfile;
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

export default GithubScraper;
