import { handleActions } from 'redux-actions';
import * as actions from '../actions';
import { combineReducers } from 'redux';

const view = handleActions(
  {
    [actions.switchView](state, { payload }) {
      console.log(payload);
      return payload;
    }
  },
  'daily'
);

const ratesFetchingState = handleActions(
  {
    [actions.updateRatesFailure]() {
      return 'failure';
    },
    [actions.updateRatesRequest]() {
      return 'requesting';
    },
    [actions.updateRatesSuccess]() {
      return 'success';
    }
  },
  'none'
);

const rates = handleActions(
  {
    [actions.updateRatesSuccess](_state, { payload }) {
      return payload;
    }
  },
  []
);

export default combineReducers({
  view,
  ratesFetchingState,
  rates
});
