import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TrapApiError, WidgetHeader, WidgetLoader, Widget, WidgetBody } from '@mozaik/ui';

const request = require('request-promise-native')

export default class Cards extends Component {
    static PropTypes = {
        listId: PropTypes.string.isRequired,
		title: PropTypes.string,
        apiData: PropTypes.shape({
            Cards: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired
        }),
        apiError: PropTypes.object,
    }

    static getApiRequest({ listId }) {
        return {
            id: `trello.cards.${listId}`,
            params: { listId }
        }
    }

    render() {
        const { apiData, apiError, title } = this.props;

        let body = <WidgetLoader/>;
        let count = 0;
        if (apiData && apiData.body.length) {
            count = apiData.body.length;
            console.log(apiData);
            body = (
                <div id="projects">
                    {apiData.body.map(project =>
                        <div className="project">
                            <p>{project.name}</p>
                            <p>{project.due}</p>
                        </div>
                    )}
                </div>
            )
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
