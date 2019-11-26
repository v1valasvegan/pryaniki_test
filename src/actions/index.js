import { createAction } from 'redux-actions';
import moment from 'moment';

export const switchView = createAction('VIEW_SWITCH');
export const updateRatesRequest = createAction('RATES_UPDATE_REQUEST');
export const updateRatesSuccess = createAction('RATES_UPDATE_SUCCESS');
export const updateRatesFailure = createAction('RATES_UPDATE_FAILURE');

const getIntervalStart = (view) => {
    switch (view) {
        case 'daily': 
            return moment().subtract(31,'days').format('YYYY-MM-DD');
        case 'monthly': 
            return moment().subtract(12, 'month').format('YYYY-MM-DD');
        case 'yearly':
            return moment().subtract(25, 'year').format('YYYY-MM-DD');
        default: 
            return moment().substract(31,'days').format('YYYY-MM-DD');
    }
}

const getUrlString = (view) => `https://frankfurter.app/${getIntervalStart(view)}..?to=USD`

export const updateRates = (view) => async(dispatch) => {
    dispatch(updateRatesRequest());
    try {
        const response = await fetch(getUrlString(view), { method: 'GET'});
        const { rates } = await response.json();
        dispatch(updateRatesSuccess(rates));
    } catch(e) {
        console.log(e);
        dispatch(updateRatesFailure());
    }
}