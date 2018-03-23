'use strict'

const request = require('request-promise-native')
const chalk = require('chalk')
const config = require('./config')

// https://developer.github.com/v3/#user-agent-required
//const userAgent = 'donkeycode/ext-trello'
//const previewAcceptHeader = 'application/vnd.github.spiderman-preview'

/**
 * @param {Mozaik} mozaik
 */
const client = mozaik => {
    mozaik.loadApiConfig(config)

    const buildApiRequest = (path) => {
        const url = config.get('trello.baseUrl')
        const key = config.get('trello.key');
        const token = config.get('trello.token');

        const options = {
            uri: `${url}${path}`,
            qs: {
                key: key,
                token: token
            },
            json: true,
            resolveWithFullResponse: true
        }

        return request(options)
    }

    const apiCalls = {
		cards({ listId }) {
			return buildApiRequest(`/lists/${listId}/cards`)
		}
    }

    return apiCalls
}

module.exports = client
