import $ from 'jquery';

class GithubScraper {
  constructor(id) {
    this._id = id;
  }

  getJsonData(url) {
    const data = JSON.parse($.ajax({
      url: url,
      dataType: 'JSON',
      async: false
    }).responseText);

    return data;
  }

  // Get the user's profile.
  getProfile() {
    const id = this._id;
    const url = `https://api.github.com/users/${id}`;
    const data = this.getJsonData(url);

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
    const data = this.getJsonData(url);

    let userRepository = [];

    console.log(data[0]);

    for (let i in data) {
      userRepository[i] = {};

      userRepository[i].name = data[i].name;
      userRepository[i].description = data[i].description;
      userRepository[i].date = data[i].created_at;
    }

    return userRepository;
  }

  changeDocTitle() {
    const userName = this.getProfile().name;
    document.title = `${userName}'s Git profile`;
  }
}

export default GithubScraper;
