/** @format */

/**
 * External dependencies
 */
import page from 'page';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { localize } from 'i18n-calypso';

/**
 * Internal dependencies
 */
import QuerySourcePaymentTransactionDetail from 'components/data/query-source-payment-transaction-detail';
import EmptyContent from 'components/empty-content';
import Main from 'components/main';
import { getSourcePaymentTransactionDetail } from 'state/selectors';

class CheckoutPending extends PureComponent {
	static propTypes = {
		orderId: PropTypes.number.isRequired,
		siteSlug: PropTypes.string.isRequired,
	};

	componentWillReceiveProps( nextProps ) {
		if ( 'successful' === nextProps.paymentInfo.status ) {
			page( `/checkout/thank-you/${ this.props.siteSlug }` );
			return;
		}

		// redirect users back to the checkout page so they can try again.
		if ( 'failed' === nextProps.paymentInfo.status ) {
			page( `/checkout/${ this.props.siteSlug }` );
			return;
		}
	}

	render() {
		const { orderId, translate } = this.props;

		return (
			<Main className="checkout-thank-you__pending">
				<QuerySourcePaymentTransactionDetail orderId={ orderId } pollIntervalMs={ 5000 } />
				<EmptyContent
					illustration={ '/calypso/images/illustrations/almost-there.svg' }
					illustrationWidth={ 500 }
					title={ 'Processing …' }
					line={ translate( 'Please wait while we are processing your order.' ) }
				/>
			</Main>
		);
	}
}

export default connect( ( state, props ) => ( {
	paymentInfo: getSourcePaymentTransactionDetail( state, props.orderId ),
} ) )( localize( CheckoutPending ) );
