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

        console.log(options);
        return request(options)
    }

    const apiCalls = {
		cards({ listId }) {
			return buildApiRequest(`/lists/${listId}/cards`)
        }
        // cards({ listId }) {
        //     return buildApiRequest(`/lists/${listId}/cards`)
        //         .then((res) => {
        //             const idMembers = [];
        //             res.body.foreach((project) => {
        //                 project.idMembers.foreach((idMember) => {
        //                     if (idMembers.indexOf(idMember) == -1) {
        //                         idMembers.push(idMember);
        //                     }
        //                 });
        //             });
        //             return Promise.all(
        //                 idMembers.map((id) => {
        //                     return apiCalls.member(Object.assign({ idMember: id }));
        //                 })
        //             )
        //         })
        // },

        // member({ idMember }) {
        //     return buildApiRequest(`/members/${idMember}`);
        // }
    }

    return apiCalls
}

module.exports = client
