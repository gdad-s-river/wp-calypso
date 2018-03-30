/** @format */

/**
 * External dependencies
 */
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import Button from 'components/button';
import ButtonGroup from 'components/button-group';
import {
	splitPostRevisionsDiffView,
	unifyPostRevisionsDiffView,
} from 'state/posts/revisions/actions';

const EditorRevisionsListViewButtons = ( { translate, viewSplit, viewUnified } ) => {
	return (
		<ButtonGroup className="editor-revisions-list__view-buttons">
			<Button
				compact
				className="editor-revisions-list__unified-button"
				type="button"
				onClick={ viewUnified }
			>
				{ translate( 'Unified' ) }
			</Button>
			<Button
				compact
				className="editor-revisions-list__split-button"
				type="button"
				onClick={ viewSplit }
			>
				{ translate( 'Split' ) }
			</Button>
		</ButtonGroup>
	);
};

EditorRevisionsListViewButtons.propTypes = {
	viewSplit: PropTypes.func.isRequired,
	viewUnified: PropTypes.func.isRequired,
	translate: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
	return {
		viewUnified: () => {
			dispatch( unifyPostRevisionsDiffView() );
		},
		viewSplit: () => {
			dispatch( splitPostRevisionsDiffView() );
		},
	};
};

export default connect( null, mapDispatchToProps )( localize( EditorRevisionsListViewButtons ) );
