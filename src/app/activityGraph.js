import $ from 'jquery';
import uri from 'urijs';
import { bb } from 'billboard.js';
import GithubScraper from './githubScraper';

class ActivityGraph {
  drawGraph() {
    const uriData = uri().query(true);
    const githubId = uriData['gh'];
    const gitlabId = uriData['gl'];

    const gh = new GithubScraper(githubId);
    const ghActDate = gh.getActivity();

    var graph = bb.generate({
      bindto: '#activity-graph',
      data: {
        x: 'x',
        columns: [
          ghActDate[0],
          ghActDate[1]
        ]
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%Y-%m-%d'
          }
        }
      },
      padding: {
        right: 30
      },
      color: {
        pattern: [
          '#000000'
        ]
      }
    });
  }
}

export default ActivityGraph;
