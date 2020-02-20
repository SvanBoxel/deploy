const handler = require('./index')

const path = require('path');

const core = require('@actions/core');

const { createProbot } = require('probot');

// Setup Probot app
const githubToken = process.env.GITHUB_TOKEN;
const probot = createProbot({ githubToken });
probot.setup(handler);

// Process the event
const event = process.env.GITHUB_EVENT_NAME;
const payloadPath = process.env.GITHUB_EVENT_PATH;
const payload = require(path.resolve(payloadPath));
core.debug(`Receiving event ${JSON.stringify(event)}`);
probot.receive({ name: event, payload }).catch(err => core.setFailed(`Action failed with error: ${err.message}`))