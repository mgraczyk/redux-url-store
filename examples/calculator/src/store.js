import { createStore, applyMiddleware, compose } from 'redux';
import { urlStoreMiddleware, loadInitialState } from 'redux-url-store';

import reducers from './reducers';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const reduxStore = createStore(
  reducers,
  loadInitialState(),
  composeEnhancers(applyMiddleware(urlStoreMiddleware)),
);

export default reduxStore;
