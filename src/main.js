import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import uri from 'urijs';
import Renderer from './components/Renderer';
import GithubScraper from './app/githubScraper';
import GitlabScraper from './app/gitlabScraper';

const rootElement = $('#root')[0];

const uriData = uri().query(true);
const githubId = uriData['gh'];
const gitlabId = uriData['gl'];
const mainGit = uriData['m'];

let user = {};

// Set the document title
if (mainGit === 'gh') {
  user = new GithubScraper(githubId);
  user.setDocTitle();
} else {
  user = new GithubScraper(gitlabId);
  user.setDocTitle();
}

ReactDOM.render(
  <Renderer />,
  rootElement
);
