function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TrapApiError, WidgetHeader, WidgetLoader, Widget, WidgetBody } from '@mozaik/ui';

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

    Cards.prototype.render = function render() {
        var _props = this.props,
            apiData = _props.apiData,
            apiError = _props.apiError;


        var body = React.createElement(WidgetLoader, null);
        var count = 0;
        if (apiData) {
            console.log(apiData);
        }

        return React.createElement(
            Widget,
            null,
            React.createElement(WidgetHeader, {
                title: title || 'Trello cards',
                icon: GithubIcon,
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