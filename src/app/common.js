import $ from 'jquery';
import moment from 'moment';

class Common {
  getJsonData(url) {
    const DATA = JSON.parse($.ajax({
      url: url,
      dataType: 'JSON',
      async: false
    }).responseText);

    return DATA;
  }

  setDateArray() {
    const DATE_RANGE = 60;
    let date = ['x'];
    
    for (let i = DATE_RANGE; i >= 0; i -= 1) {
      date.push(moment().add(-i, 'days').format('YYYY-MM-DD'));
    }

    return date;
  }

  setDocTitle(title) {
    document.title = `${title}'s Git profile`;
  }

  sortByOrder(array, order) {
    if (order === 'desc') { // Order by descending
      array.sort((a, b) => {
        if (a < b) {
          return 1;
        } else if (a > b) {
          return -1;
        } else {
          return 0;
        }
      });
    } else if (order === 'asc') { // Order by ascending
      array.sort((a, b) => {
        if (a > b) {
          return 1;
        } else if (a < b) {
          return -1;
        } else {
          return 0;
        }
      });
    } else {
      console.log('[ERR!][sortByOrder] Unknown order option.');
    }

    return array;
  }

  sortObjectByOrder(array, value, order) {
    if (order === 'desc') { // Order by descending
      array.sort((a, b) => {
        if (a[value] < b[value]) {
          return 1;
        } else if (a[value] > b[value]) {
          return -1;
        } else {
          return 0;
        }
      });
    } else if (order === 'asc') { // Order by ascending
      array.sort((a, b) => {
        if (a[value] > b[value]) {
          return 1;
        } else if (a[value] < b[value]) {
          return -1;
        } else {
          return 0;
        }
      });
    } else {
      console.log('[ERR!][sortObjectByOrder] Unknown order option.');
    }

    return array;
  }
}

export default Common;
