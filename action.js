process.env.DISABLE_STATS = 'true';

const handler = require('./index')
const path = require('path');
const { createProbot } = require('probot');
const { Octokit } = require("@octokit/rest");

const token = process.env.GITHUB_TOKEN;

// Setup Probot app
const probot = createProbot({ token });
probot.setup([handler]);

// Setup octokit
const octokit = new Octokit({ auth: token });

// Process the event
async function run() {
  const event = process.env.GITHUB_EVENT_NAME;
  const payloadPath = process.env.GITHUB_EVENT_PATH;
  const payload = require(path.resolve(payloadPath));
  core.debug(`Receiving event ${JSON.stringify(event)}`);

  octokit.checks.update({
    owner: payload.repository.owner.login,
    repo: payload.repository.name,
    check_run_id: process.env.GITHUB_RUN_ID,
    conclusion: 'success'
  })

  probot.receive({ name: event, payload }).catch(err => core.setFailed(`Action failed with error: ${err.message}`))
}

run();