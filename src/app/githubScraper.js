import $ from 'jquery';
import moment from 'moment';

class GithubScraper {
  constructor(id) {
    this._id = id;
  }

  getJsonData(url) {
    const DATA = JSON.parse($.ajax({
      url: url,
      dataType: 'JSON',
      async: false
    }).responseText);

    return DATA;
  }

  getProfile() {
    const URL = `https://api.github.com/users/${this._id}`;
    const DATA = this.getJsonData(URL);

    let userProfile = {
      name: '',
      avatar: '',
      bio: ''
    };

    userProfile.name = DATA.name;
    userProfile.avatar = DATA.avatar_url;
    userProfile.bio = DATA.bio;

    return userProfile;
  }

  getRepository() {
    const URL = `https://api.github.com/users/${this._id}/repos`;
    const DATA = this.getJsonData(URL);

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

  getActivity() {
    const URL = `https://api.github.com/users/${this._id}/events`;
    const DATA = this.getJsonData(URL);
    const DATE_ARR = this.setDateArray();

    let userActDate = [];
    let userAct = ['GitHub'];

    for (let i = 0; i < DATA.length; i += 1) {
      if (DATA.type !== 'ForkEvent' && DATA.type !== 'WatchEvent') {
        userActDate.push(moment(DATA[i].created_at).format('YYYY-MM-DD'));
      }
    }

    // Sort by date
    userActDate.sort((a, b) => {
      if (a > b) {
        return 1;
      } else if (a < b) {
        return -1;
      } else {
        return 0;
      }
    });

    for (let i = 1, j = 0; i < DATE_ARR.length; i += 1) {
      let actNum = 0;

      if (userActDate[j] === DATE_ARR[i]) {
        for (let k = j; k < userActDate.length; k += 1) {
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

    return [DATE_ARR, userAct];
  }

  setDateArray() {
    const dayRange = 30;
    let date = ['x'];
    
    for (let i = dayRange; i >= 0; i--) {
      date.push(moment().add(-i, 'days').format('YYYY-MM-DD'));
    }

    return date;
  }

  setDocTitle() {
    const userName = this.getProfile().name;
    document.title = `${userName}'s Git profile`;
  }
}

export default GithubScraper;
