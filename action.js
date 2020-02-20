process.env.DISABLE_STATS = 'true';

const handler = require('./index')
const path = require('path');
const { createProbot } = require('probot');
const core = require('@actions/core');

const token = process.env.GITHUB_TOKEN;

// Setup Probot app
const probot = createProbot({ token });
probot.setup([handler]);

// Process the event
async function run() {
  const event = process.env.GITHUB_EVENT_NAME;
  const payloadPath = process.env.GITHUB_EVENT_PATH;
  const payload = require(path.resolve(payloadPath));
  core.debug(`Receiving event ${JSON.stringify(event)}`);

  probot.receive({ name: event, payload }).catch(err => core.setFailed(`Action failed with error: ${err.message}`))
}

run();