import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/index';
import {
        logger,
        crashReporter
      }                       from 'Middleware';

/*
 * @param {Object} initial state to bootstrap our stores with for server-side rendering
 * @param {History Object} a history object. We use `createMemoryHistory` for server-side rendering,
 *                          while using browserHistory for client-side
 *                          rendering.
 */
const configureStore = function (initialState, history) {
  // Installs hooks that always keep react-router and redux store in sync
  const middleware = [thunk, routerMiddleware(history), logger, crashReporter];
  let store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  );

  return store;
}

module.exports = configureStore;
