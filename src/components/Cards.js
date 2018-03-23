import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TrapApiError, WidgetHeader, WidgetLoader, Widget, WidgetBody } from '@mozaik/ui';

export default class Cards extends Component {
    static PropTypes = {
        listId: PropTypes.string.isRequired,
		title: PropTypes.string,
        apiData: PropTypes.shape({
            Cards: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired
        }),
        apiError: PropTypes.object
    }

    static getApiRequest({ listId }) {
        return {
            id: `trello.cards.${listId}`,
            params: { listId }
        }
    }

    render() {
        const { apiData, apiError } = this.props;

        let body = <WidgetLoader/>;
        let count = 0;
        if (apiData) {
			console.log(apiData);
        }

        return (
            <Widget>
                <WidgetHeader
                    title={title || 'Trello cards'}
                    count={count}
                />
                <WidgetBody>
                    <TrapApiError error={apiError}>
                        {body}
                    </TrapApiError>
                </WidgetBody>
            </Widget>
        )
    }
}
