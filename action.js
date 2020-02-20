process.env.DISABLE_STATS = 'true';

const handler = require('./index')
const path = require('path');
const core = require('@actions/core');
const github = require('@actions/github');
const { createProbot } = require('probot');

// Setup Probot app
const token = process.env.GITHUB_TOKEN;
const octokit = new github.GitHub(token);
const context = github.context;
const probot = createProbot({ token });
probot.setup([handler]);


// Process the event
const event = process.env.GITHUB_EVENT_NAME;
const payloadPath = process.env.GITHUB_EVENT_PATH;
const payload = require(path.resolve(payloadPath));
core.debug(`Receiving event ${JSON.stringify(event)}`);


const thing = {
  owner: context.repo.owner.login,
  repo: context.repo.name,
  check_run_id: process.env.GITHUB_RUN_ID,
  conclusion: 'success'
};


const data = {
  owner: payload.repository.owner.login,
  repo: payload.repository.name,
  check_run_id: process.env.GITHUB_RUN_ID,
  conclusion: 'success'
}

console.log('data', data);
console.log('payload', payload);

octokit.checks.update(data)

probot.receive({ name: event, payload }).catch(err => core.setFailed(`Action failed with error: ${err.message}`))
  