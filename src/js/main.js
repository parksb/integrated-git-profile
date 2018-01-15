import $ from 'jquery';
import uri from 'urijs';

import GithubScraper from './githubScraper';
import GitlabScraper from './gitlabScraper';

// Get GitHub ID and GitLab ID from the uri.
const uriData = uri().query(true);
const githubId = uriData['github'];
const gitlabId = uriData['gitlab'];

const ghData = new GithubScraper(githubId);
const glData = new GitlabScraper(gitlabId);

ghData.getProfile();
