import $ from 'jquery';
import uri from 'urijs';
import { bb } from 'billboard.js';
import GithubScraper from './githubScraper';
import GitlabScraper from './gitlabScraper';
import Common from './common';

class ActivityGraph {
  drawGraph() {
    const URI_DATA = uri().query(true);
    const GH_ID = URI_DATA['gh'];
    const GL_ID = URI_DATA['gl'];

    const GH = new GithubScraper(GH_ID);
    const GH_ACT_DATE = GH.getActivity();

    const GL = new GitlabScraper(GL_ID);
    const GL_ACT_DATE = GL.getActivity();

    const CM = new Common();

    bb.generate({
      bindto: '#activity-graph',
      data: {
        x: 'x',
        columns: [
          CM.setDateArray(),
          GH_ACT_DATE,
          GL_ACT_DATE
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
          '#000000',
          '#FC6D26'
        ]
      }
    });
  }
}

export default ActivityGraph;
