function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TrapApiError, WidgetHeader, WidgetLoader, Widget, WidgetBody, WidgetAvatar } from '@mozaik/ui';

var request = require('request-promise-native');

var Cards = function (_Component) {
    _inherits(Cards, _Component);

    function Cards() {
        _classCallCheck(this, Cards);

        return _possibleConstructorReturn(this, _Component.apply(this, arguments));
    }

    Cards.getApiRequest = function getApiRequest(_ref) {
        var listId = _ref.listId;

        return {
            id: 'trello.cards.' + listId,
            params: { listId: listId }
        };
    };

    Cards.prototype.getMember = function getMember(idMember) {
        for (var i = 0; i < this.props.apiData.members.length; i++) {
            console.log('this.props.apiData.members[i]', this.props.apiData.members[i]);
            if (this.props.apiData.members[i].id == idMember) {
                return this.props.apiData.members[i];
            }
        }
        return null;
    };

    Cards.prototype.getMemberAvatarUrl = function getMemberAvatarUrl(idMember) {
        var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 170;

        var member = this.getMember(idMember);
        return 'https://trello-avatars.s3.amazonaws.com/' + member.avatarHash + '/' + size + '.png';
    };

    Cards.prototype.getMemberFullName = function getMemberFullName(idMember) {
        var member = this.getMember(idMember);
        return member.fullName;
    };

    Cards.prototype.getMemberUrl = function getMemberUrl(idMember) {
        var member = this.getMember(idMember);
        return member.url;
    };

    Cards.prototype.getMemberInitials = function getMemberInitials(idMember) {
        var member = this.getMember(idMember);
        return member.initials;
    };

    Cards.prototype.getFormatedDate = function getFormatedDate(date) {
        return new Date(date).toLocaleDateString();
    };

    Cards.prototype.render = function render() {
        var _this2 = this;

        var _props = this.props,
            apiData = _props.apiData,
            apiError = _props.apiError,
            title = _props.title;


        var body = React.createElement(WidgetLoader, null);
        var count = 0;
        console.log('apiData', apiData);
        if (apiData) {
            count = apiData.cards.length;
            body = React.createElement(
                'div',
                { id: 'cards' },
                apiData.cards.map(function (project) {
                    return React.createElement(
                        'div',
                        { className: 'project' },
                        React.createElement(
                            'div',
                            null,
                            React.createElement(
                                'p',
                                null,
                                project.name
                            ),
                            project.due && React.createElement(
                                'p',
                                { className: 'project-due' },
                                'Fin du projet: ',
                                _this2.getFormatedDate(project.due)
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'members' },
                            project.idMembers.map(function (idMember) {
                                return _this2.getMember(idMember).avatarHash ? React.createElement(
                                    WidgetAvatar,
                                    { href: _this2.getMemberUrl(idMember), size: '4vmin', style: { display: 'inlineBlock', marginLeft: '10px' } },
                                    React.createElement('img', { src: _this2.getMemberAvatarUrl(idMember), alt: _this2.getMemberFullName(idMember), title: _this2.getMemberFullName(idMember) })
                                ) : React.createElement(
                                    'a',
                                    { href: _this2.getMemberUrl(idMember), title: _this2.getMemberFullName(idMember), className: 'initials', target: '_blank' },
                                    _this2.getMemberInitials(idMember)
                                );
                            })
                        )
                    );
                })
            );
        }

        return React.createElement(
            Widget,
            null,
            React.createElement(WidgetHeader, {
                title: title || 'Trello cards',
                count: count
            }),
            React.createElement(
                WidgetBody,
                null,
                React.createElement(
                    TrapApiError,
                    { error: apiError },
                    body
                )
            )
        );
    };

    return Cards;
}(Component);

Cards.PropTypes = {
    listId: PropTypes.string.isRequired,
    title: PropTypes.string,
    apiData: PropTypes.shape({
        Cards: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired
    }),
    apiError: PropTypes.object
};
export default Cards;