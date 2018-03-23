'use strict';

var request = require('request-promise-native');
var chalk = require('chalk');
var config = require('./config');

// https://developer.github.com/v3/#user-agent-required
//const userAgent = 'donkeycode/ext-trello'
//const previewAcceptHeader = 'application/vnd.github.spiderman-preview'

/**
 * @param {Mozaik} mozaik
 */
var client = function client(mozaik) {
    mozaik.loadApiConfig(config);

    var buildApiRequest = function buildApiRequest(path) {
        var url = config.get('trello.baseUrl');
        var key = config.get('trello.key');
        var token = config.get('trello.token');

        var options = {
            uri: '' + url + path,
            qs: {
                key: key,
                token: token
            },
            json: true,
            resolveWithFullResponse: true
        };

        console.log(options);
        return request(options);
    };

    var apiCalls = {
        cards: function cards(_ref) {
            var listId = _ref.listId;

            return buildApiRequest('/lists/' + listId + '/cards');
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

    };

    return apiCalls;
};

module.exports = client;