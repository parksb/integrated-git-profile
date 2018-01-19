import $ from 'jquery';
import request from 'request';

class GitlabScraper {
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

  getGitlabUserId() {
    const url = `https://gitlab.com/api/v4/users?username=${this._id}`;
    const data = this.getJsonData(url);

    return data[0].id;
  }

  getProfile() {
    const id = this.getGitlabUserId();
    const url = `https://gitlab.com/api/v4/users/${id}`;
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
    const id = this.getGitlabUserId();
    const url = `https://gitlab.com/api/v4/users/${id}/projects`;
    const data = this.getJsonData(url);

    let userRepository = [];

    for (let i in data) {
      userRepository[i] = {
        from: '',
        name: '',
        description: '',
        date: ''
      };

      userRepository[i].from = 'GitLab';
      userRepository[i].name = data[i].name;
      userRepository[i].description = data[i].description;
      userRepository[i].date = data[i].created_at;
      userRepository[i].url = `https://gitlab.com/${this._id}/${data[i].name}`;
    }

    return userRepository;
  }

  changeDocTitle() {
    const userName = this.getProfile().name;
    document.title = `${userName}'s Git profile`;
  }
}

export default GitlabScraper;
