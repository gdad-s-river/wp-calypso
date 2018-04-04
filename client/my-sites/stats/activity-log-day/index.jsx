/** @format */
/**
 * External dependencies
 */
import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import ActivityLogItem from '../activity-log-item';
import { getActivityLog, getRequestedRewind, getRewindEvents } from 'state/selectors';
import { ms, makeIsDiscarded } from 'state/activity-log/log/is-discarded';

class ActivityLogDay extends Component {
	static defaultProps = {
		disableRestore: false,
		disableBackup: false,
		isRewindActive: true,
	};

	state = {
		rewindHere: false,
	};

	componentWillReceiveProps( nextProps ) {
		// if Rewind dialog is being displayed and it's then canceled or a different Rewind button is clicked
		if ( this.state.rewindHere && this.props.requestedRestoreId !== nextProps.requestedRestoreId ) {
			this.setState( {
				rewindHere: false,
			} );
		}
	}

	render() {
		const {
			disableBackup,
			disableRestore,
			isDiscardedPerspective,
			isRewindActive,
			logs,
			rewindEvents,
			siteId,
		} = this.props;

		const isDiscarded =
			isDiscardedPerspective && makeIsDiscarded( rewindEvents, isDiscardedPerspective );

		return (
			<Fragment>
				{ logs.map( log => (
					<ActivityLogItem
						key={ log.activityId }
						activityId={ log.activityId }
						disableRestore={ disableRestore }
						disableBackup={ disableBackup }
						hideRestore={ ! isRewindActive }
						isDiscarded={ isDiscarded ? isDiscarded( log.activityTs ) : log.activityIsDiscarded }
						siteId={ siteId }
					/>
				) ) }
			</Fragment>
		);
	}
}

export default localize(
	connect( ( state, { logs, siteId } ) => {
		const requestedRestoreId = getRequestedRewind( state, siteId );
		const rewindEvents = getRewindEvents( state, siteId );
		const isDiscardedPerspective = requestedRestoreId
			? new Date( ms( getActivityLog( state, siteId, requestedRestoreId ).activityTs ) )
			: undefined;

		return {
			logs,
			rewindEvents,
			isDiscardedPerspective,
			requestedRestoreId,
		};
	} )( ActivityLogDay )
);
