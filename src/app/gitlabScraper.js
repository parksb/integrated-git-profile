import $ from 'jquery';
import moment from 'moment';
import Common from './common';

class GitlabScraper {
  constructor(id) {
    this._id = id;
    this._cm = new Common();
  }

  // Get GitLab ID(number) from the name(string).
  getGitlabUserId() {
    const URL = `https://gitlab.com/api/v4/users?username=${this._id}`;
    const DATA = this._cm.getJsonData(URL);

    return DATA[0].id;
  }

  // Get user profile.
  getProfile() {
    const ID = this.getGitlabUserId();
    const URL = `https://gitlab.com/api/v4/users/${ID}`;
    const DATA = this._cm.getJsonData(URL);

    let userProfile = {
      name: DATA.name,
      avatar: DATA.avatar_url,
      bio: DATA.bio
    };

    return userProfile;
  }

  // Get user repositories.
  getRepository() {
    const ID = this.getGitlabUserId();
    const URL = `https://gitlab.com/api/v4/users/${ID}/projects`;
    const DATA = this._cm.getJsonData(URL);

    let userRepository = [];

    for (let i in DATA) {
      userRepository.push({
        from: 'GitLab',
        name: DATA[i].name,
        description: DATA[i].description,
        date: DATA[i].last_activity_at,
        url: `https://gitlab.com/${this._id}/${DATA[i].name}`
      });
    }

    return userRepository;
  }

  // Get user activities.
  getActivity() {
    const ID = this.getGitlabUserId();
    const URL = `https://gitlab.com/api/v4/users/${ID}/events`;
    const DATE_ARR = this._cm.setDateArray();

    let data = this._cm.getJsonData(URL);
    let userActDate = [];
    let userAct = ['GitLab'];

    data = this._cm.sortObjectByOrder(data, 'created_at', 'asc');
    
    for (let i = 0; i < data.length; i += 1) {
      let date = moment(data[i].created_at).format('YYYY-MM-DD');
      
      if (date >= DATE_ARR[1]) { // date should be greater than oldest date.
        userActDate.push(date);
      }
    }

    // Find the user activities.
    for (let i = 1, j = 0; i < DATE_ARR.length; i += 1) {
      let actNum = 0;

      if (userActDate[j] === DATE_ARR[i]) { // Catch a activity.
        for (let k = j; k < userActDate.length; k += 1) { // Find other activities at the same day.
          if (userActDate[j] === userActDate[k]) {
            actNum += 1;
          } else {
            j = k;
            break;
          }
        }
      }

      userAct.push(actNum);
    }

    return userAct;
  }
}

export default GitlabScraper;
