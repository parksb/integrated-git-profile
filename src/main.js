import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import uri from 'urijs';
import { bb } from 'billboard.js';
import Renderer from './components/Renderer';
import Common from './app/common';
import GithubScraper from './app/githubScraper';
import GitlabScraper from './app/gitlabScraper';
import ActivityGraph from './app/activityGraph';

const ROOT_ELEMENT = $('#root')[0];
const URI_DATA = uri().query(true);
const GH_ID = URI_DATA['gh'];
const GL_ID = URI_DATA['gl'];
const MAIN_GIT = URI_DATA['m'];

const CM = new Common();
const GRAPH = new ActivityGraph();

let user = {};

// Set the document title
if (MAIN_GIT === 'gh') {
  user = new GithubScraper(GH_ID);
  CM.setDocTitle(user.getProfile().name);
} else {
  user = new GitlabScraper(GL_ID);
  CM.setDocTitle(user.getProfile().name);
}

ReactDOM.render(
  <Renderer />,
  ROOT_ELEMENT
);

GRAPH.drawGraph();
