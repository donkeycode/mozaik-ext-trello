import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TrapApiError, WidgetHeader, WidgetLoader, Widget, WidgetBody, WidgetAvatar } from '@mozaik/ui';

const request = require('request-promise-native')

export default class Cards extends Component {
    static PropTypes = {
        listId: PropTypes.string.isRequired,
        title: PropTypes.string,
        view: PropTypes.string,
        apiData: PropTypes.shape({
            Cards: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)).isRequired
        }),
        apiError: PropTypes.object,
    }

    constructor() {
        super(props);
    }

    static defaultProps = {
        last_members_required: null
    }

    static getApiRequest({ listId }) {
        var members_required = false;
        if (!this.props.last_members_required || (this.props.last_members_required * 1000 + 3600) < (new Date() * 1000)) {
            this.props.last_members_required = new Date();

            members_required = true;
        }

        return {
            id: `trello.cards.${listId}.${members_required}`,
            params: { listId, members_required }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.apiData) {
            nextProps.apiData = this.props.apiData;
        }
    }

    getMember(idMember) {
        for (var i = 0; i < this.props.apiData.members.length; i++) {
            if (this.props.apiData.members[i].id == idMember) {
                return this.props.apiData.members[i];
            }
        }

        return null;
    }

    getMemberAvatarUrl(idMember, size = 170) {
        const member = this.getMember(idMember);
        return 'https://trello-avatars.s3.amazonaws.com/' + member.avatarHash + '/' + size + '.png'
    }

    getMemberFullName(idMember) {
        const member = this.getMember(idMember);

        return member.fullName;
    }

    getMemberUrl(idMember) {
        const member = this.getMember(idMember);

        return member.url;
    }

    getMemberInitials(idMember) {
        const member = this.getMember(idMember);

        return member.initials;
    }

    getFormatedDate(date) {
        return new Date(date).toLocaleDateString();
    }

    render() {
        const { view, apiData, apiError, title } = this.props;

        let body = <WidgetLoader/>;
        let count = 0;
        let viewId = view === 'tv' ? 'tv' : 'screen';
        if (apiData) {
            count = apiData.cards.length;
            body = (
                <div id="cards">
                    <div className={viewId}>
                        {apiData.cards.map(project =>
                            <div className="project">
                                <div>
                                    <p className="project-name">{project.name}</p>
                                    { project.due && <p className="project-due">Fin du projet: {this.getFormatedDate(project.due)}</p>}
                                </div>
                                <div className="members">
                                    {project.idMembers.map(idMember =>
                                        this.getMember(idMember).avatarHash ? (
                                            <WidgetAvatar href={this.getMemberUrl(idMember)} size="4vmin" style={{ display: 'inlineBlock', marginLeft: '10px' }}>
                                                <img src={this.getMemberAvatarUrl(idMember)} alt={this.getMemberFullName(idMember)} title={this.getMemberFullName(idMember)}/>
                                            </WidgetAvatar>
                                        ) : (
                                            <a href={this.getMemberUrl(idMember)}  title={this.getMemberFullName(idMember)} className="initials" target="_blank">{ this.getMemberInitials(idMember)}</a>
                                        )

                                    )}
                                </div>
                            </div>
                        )}
                    </div>
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
