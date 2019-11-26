import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import reducers from './reducers';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { updateRates } from '../src/actions';
import thunk from 'redux-thunk';

const store = createStore(reducers, applyMiddleware(thunk));

store.dispatch(updateRates('daily'));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
