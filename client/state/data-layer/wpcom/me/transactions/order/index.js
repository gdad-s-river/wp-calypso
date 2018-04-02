/** @format */

/**
 * External dependencies
 */

/**
 * Internal dependencies
 */
import { http } from 'state/data-layer/wpcom-http/actions';
import { dispatchRequestEx } from 'state/data-layer/wpcom-http/utils';
import { setOrderTransaction, setOrderTransactionError } from 'state/order-transactions/actions';
import { ORDER_TRANSACTION_FETCH } from 'state/action-types';
import fromApi from './from-api';

export const fetchOrderTransaction = action =>
	http(
		{
			method: 'GET',
			path: `/me/transactions/order/${ action.orderId }`,
			apiNamespace: 'rest/v1',
		},
		action
	);

export const onSuccess = ( { orderId }, detail ) => setOrderTransaction( orderId, detail );

export const onError = ( { orderId }, error ) => setOrderTransactionError( orderId, error );

export default {
	[ ORDER_TRANSACTION_FETCH ]: [
		dispatchRequestEx( {
			fetch: fetchOrderTransaction,
			onSuccess,
			onError,
			fromApi,
		} ),
	],
};
