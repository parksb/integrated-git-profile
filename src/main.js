import $ from 'jquery';
import uri from 'urijs';

import GithubScraper from './app/githubScraper';
// import GitlabScraper from './app/gitlabScraper';

// Get GitHub ID and GitLab ID from the uri.
const uriData = uri().query(true);
const githubId = uriData['github'];
// const gitlabId = uriData['gitlab'];

let ghData = new GithubScraper(githubId);
// const glData = new GitlabScraper(gitlabId);

ghData.getProfile((user) => {
  console.log(user.name);
  console.log(user.bio);
  console.log(user.avatar);
});
