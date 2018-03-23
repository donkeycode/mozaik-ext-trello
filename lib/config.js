'use strict';

/*
 * This file is part of the Mozaïk project.
 *
 * (c) 2016 Raphaël Benitte
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

var convict = require('convict');

var config = convict({
    github: {
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