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

  getRepository() {
    const id = this._id;
    const url = `https://api.github.com/users/${id}/repos`;
    const data = this.getJsonData(url);

    let userRepository = [];

    for (let i in data) {
      userRepository[i] = {
        from: '',
        name: '',
        description: '',
        date: ''
      };

      userRepository[i].from = 'GitHub';
      userRepository[i].name = data[i].name;
      userRepository[i].description = data[i].description;
      userRepository[i].date = data[i].created_at;
      userRepository[i].url = `https://github.com/${this._id}/${data[i].name}`;
    }

    return userRepository;
  }

  changeDocTitle() {
    const userName = this.getProfile().name;
    document.title = `${userName}'s Git profile`;
  }
}

export default GithubScraper;
