import $ from 'jquery';
import moment from 'moment';
import Common from './common';

class GithubScraper {
  constructor(id) {
    this._id = id;
    this._cm = new Common();
  }

  // Get user profile.
  getProfile() {
    const URL = `https://api.github.com/users/${this._id}`;
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
    const URL = `https://api.github.com/users/${this._id}/repos`;
    const DATA = this._cm.getJsonData(URL);

    let userRepository = [];

    for (let i = 0; i < DATA.length; i += 1) {
      userRepository.push({
        from: 'GitHub',
        name: DATA[i].name,
        description: DATA[i].description,
        date: DATA[i].pushed_at,
        url: `https://github.com/${this._id}/${DATA[i].name}`
      });
    }

    return userRepository;
  }

  // Get user activities.
  getActivity() {
    const URL = `https://api.github.com/users/${this._id}/events`;
    const DATE_ARR = this._cm.setDateArray();

    let data = this._cm.getJsonData(URL);
    let userActDate = [];
    let userAct = ['GitHub'];

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

export default GithubScraper;
