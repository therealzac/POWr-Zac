import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/index';
import { logger, crashReporter } from 'Middleware';


const configureStore = function (initialState, history) {
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
