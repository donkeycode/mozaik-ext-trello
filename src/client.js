'use strict'

const request = require('request-promise-native')
// const chalk = require('chalk')
const config = require('./config')

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
                .then((res) => {
                    const idMembers = [];
                    for (var i = 0; i < res.body.length; i++) {
                        for (var j = 0; j < res.body[i].idMembers.length; j++) {
                            if (idMembers.indexOf(res.body[i].idMembers[j]) == -1) {
                                idMembers.push(res.body[i].idMembers[j]);
                            }
                        }
                    }
                    return Promise.all(
                        idMembers.map((id) => {
                            return apiCalls.member(Object.assign({ idMember: id }));
                        })
                    ).then((results) => {
                        const members = [];
                        for (var i = 0; i < results.length; i++) {
                            members.push(results[i].body);
                        }
                        return {
                            cards: res.body,
                            members: members
                        }
                    });
                });
        },

        member({ idMember }) {
            return buildApiRequest(`/members/${idMember}`);
        }
    }

    return apiCalls
}

module.exports = client
