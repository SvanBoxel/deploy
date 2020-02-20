const handler = require('./index')

const path = require('path');

const core = require('@actions/core');

const { createProbot } = require('probot');

// Setup Probot app
const githubToken = process.env.GITHUB_TOKEN;
const probot = createProbot({ githubToken });
probot.setup([handler]);

// Process the event
const event = process.env.GITHUB_EVENT_NAME;
const payloadPath = process.env.GITHUB_EVENT_PATH;
const payload = require(path.resolve(payloadPath));
core.debug(`Receiving event ${JSON.stringify(event)}`);
console.log(2)
probot.receive({ name: event, payload, id: '14c12d16-bcd0-42f6-853f-4eabeb484087' }).catch(err => core.setFailed(`Action failed with error: ${err.message}`))
console.log(3)