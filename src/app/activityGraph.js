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

    const CM = new Common();

    const GH = new GithubScraper(GH_ID);
    const GH_ACT_DATE = GH.getActivity();

    const GL = new GitlabScraper(GL_ID);
    const GL_ACT_DATE = GL.getActivity();

    // Set activity graph.
    bb.generate({
      bindto: '#activity-graph',
      data: {
        x: 'x',
        columns: [
          CM.setDateArray(), // Last 60 days date.
          GH_ACT_DATE, // GitHub activities.
          GL_ACT_DATE // GitLab activities.
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
          '#000000', // GitHub black.
          '#FC6D26' // GitLab orange.
        ]
      },
      onafterinit: function () {
        this.svg.selectAll('.bb-line').style('stroke-width', '2px');
      }
    });
  }
}

export default ActivityGraph;
