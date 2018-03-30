'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ui = require('@mozaik/ui');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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
            view = _props.view,
            apiData = _props.apiData,
            apiError = _props.apiError,
            title = _props.title;


        var body = _react2.default.createElement(_ui.WidgetLoader, null);
        var count = 0;
        var viewId = view === 'tv' ? 'tv' : 'screen';
        if (apiData) {
            count = apiData.cards.length;
            body = _react2.default.createElement(
                'div',
                { id: 'cards' },
                _react2.default.createElement(
                    'div',
                    { className: viewId },
                    apiData.cards.map(function (project) {
                        return _react2.default.createElement(
                            'div',
                            { className: 'project' },
                            _react2.default.createElement(
                                'div',
                                null,
                                _react2.default.createElement(
                                    'p',
                                    { className: 'project-name' },
                                    project.name
                                ),
                                project.due && _react2.default.createElement(
                                    'p',
                                    { className: 'project-due' },
                                    'Fin du projet: ',
                                    _this2.getFormatedDate(project.due)
                                )
                            ),
                            _react2.default.createElement(
                                'div',
                                { className: 'members' },
                                project.idMembers.map(function (idMember) {
                                    return _this2.getMember(idMember).avatarHash ? _react2.default.createElement(
                                        _ui.WidgetAvatar,
                                        { href: _this2.getMemberUrl(idMember), size: '4vmin', style: { display: 'inlineBlock', marginLeft: '10px' } },
                                        _react2.default.createElement('img', { src: _this2.getMemberAvatarUrl(idMember), alt: _this2.getMemberFullName(idMember), title: _this2.getMemberFullName(idMember) })
                                    ) : _react2.default.createElement(
                                        'a',
                                        { href: _this2.getMemberUrl(idMember), title: _this2.getMemberFullName(idMember), className: 'initials', target: '_blank' },
                                        _this2.getMemberInitials(idMember)
                                    );
                                })
                            )
                        );
                    })
                )
            );
        }

        return _react2.default.createElement(
            _ui.Widget,
            null,
            _react2.default.createElement(_ui.WidgetHeader, {
                title: title || 'Trello cards',
                count: count
            }),
            _react2.default.createElement(
                _ui.WidgetBody,
                null,
                _react2.default.createElement(
                    _ui.TrapApiError,
                    { error: apiError },
                    body
                )
            )
        );
    };

    return Cards;
}(_react.Component);

Cards.PropTypes = {
    listId: _propTypes2.default.string.isRequired,
    title: _propTypes2.default.string,
    view: _propTypes2.default.string,
    apiData: _propTypes2.default.shape({
        Cards: _propTypes2.default.arrayOf(_propTypes2.default.arrayOf(_propTypes2.default.object)).isRequired
    }),
    apiError: _propTypes2.default.object
};
exports.default = Cards;