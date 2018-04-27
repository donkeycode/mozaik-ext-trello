'use strict';

var request = require('request-promise-native');
// const chalk = require('chalk')
var config = require('./config');

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

        return request(options);
    };

    var apiCalls = {
        cards: function cards(_ref) {
            var listId = _ref.listId;

            return buildApiRequest('/lists/' + listId + '/cards').then(function (res) {
                var idMembers = [];
                for (var i = 0; i < res.body.length; i++) {
                    for (var j = 0; j < res.body[i].idMembers.length; j++) {
                        if (idMembers.indexOf(res.body[i].idMembers[j]) == -1) {
                            idMembers.push(res.body[i].idMembers[j]);
                        }
                    }
                }
                return Promise.all(idMembers.map(function (id) {
                    return apiCalls.member(Object.assign({ idMember: id }));
                })).then(function (results) {
                    var members = [];
                    for (var i = 0; i < results.length; i++) {
                        members.push(results[i].body);
                    }
                    return {
                        cards: res.body,
                        members: members
                    };
                });
            });
        },
        member: function member(_ref2) {
            var idMember = _ref2.idMember;

            return buildApiRequest('/members/' + idMember);
        }
    };

    return apiCalls;
};

module.exports = client;