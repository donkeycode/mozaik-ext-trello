'use strict';

var convict = require('convict');

var config = convict({
    trello: {
        baseUrl: {
            doc: 'The Trello API base url.',
            default: 'https://api.trello.com/1',
            format: String,
            env: 'TRELLO_BASE_URL'
        },
        key: {
            doc: 'The Trello API key.',
            default: '',
            format: String,
            env: 'TRELLO_API_KEY'
        },
        token: {
            doc: 'The Trello API token.',
            default: '',
            format: String,
            env: 'TRELLO_API_TOKEN'
        }
    }
});

module.exports = config;