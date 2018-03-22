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

    const buildApiRequest = (path, params) => {
        const url = config.get('github.baseUrl')

        const options = {
            uri: `${url}${path}`,
            json: true,
            resolveWithFullResponse: true
        }

        if (config.get('github.token') !== '') {
            options.headers.Authorization = `token ${config.get('github.token')}`
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
