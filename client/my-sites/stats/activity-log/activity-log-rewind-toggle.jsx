/** @format */

/**
 * External dependencies
 */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import Button from 'components/button';
import { activateRewind } from 'state/activity-log/actions';
import { isRewindActivating } from 'state/selectors';
import { recordTracksEvent, withAnalytics } from 'state/analytics/actions';

class ActivityLogRewindToggle extends Component {
	static propTypes = {
		siteId: PropTypes.number,
		label: PropTypes.string,
		isVpMigrate: PropTypes.bool,

		// mappedSelectors
		isActivating: PropTypes.bool.isRequired,

		// bound dispatch
		activateRewind: PropTypes.func.isRequired,

		// localize
		translate: PropTypes.func.isRequired,
	};

	static defaultProps = {
		isActivating: false,
		label: '',
		isVpMigrate: false,
	};

	activateRewind = () => this.props.activateRewind( this.props.siteId, this.props.isVpMigrate );

	render() {
		const { isActivating, siteId, translate, label } = this.props;

		const isSiteKnown = !! siteId;

		return (
			<Button
				className={ classNames( 'activity-log__rewind-toggle', {
					'is-busy': isSiteKnown && isActivating,
				} ) }
				primary
				disabled={ ! isSiteKnown || isActivating }
				onClick={ this.activateRewind }
			>
				{ label ? label : translate( 'Activate Rewind' ) }
			</Button>
		);
	}
}

export default connect(
	( state, { siteId } ) => ( {
		isActivating: isRewindActivating( state, siteId ),
	} ),
	{
		activateRewind: ( siteId, isVpMigrate ) =>
			withAnalytics(
				recordTracksEvent( 'calypso_activitylog_vp_migrate_rewind', { rewindOptIn: isVpMigrate } ),
				activateRewind( siteId, isVpMigrate )
			),
	}
)( localize( ActivityLogRewindToggle ) );
