import React                  from 'react';
import { Provider }           from 'react-redux';
import Application            from 'Reducers/index';
import Promise                from 'promise-polyfill';
import { ReactDOM,
         render }             from 'react-dom';
import { createStore,
         applyMiddleware,
         combineReducers }    from 'redux';
import { Router,
         Route,
         browserHistory,
         hashHistory,
         IndexRoute }         from 'react-router'

import {
  syncHistoryWithStore,
  routerReducer,
  routerMiddleware }          from 'react-router-redux'

import {
        logger,
        crashReporter
      }                       from 'Middleware';

import {

} from 'Actions';


import App                   from 'Components/Application'
import Login                 from 'Components/Login'
import Signup                from 'Components/Signup'
const configureStore = require('./utils/configureStore')

// const middleWare = [thunk, routerMiddleware(history)]
//
// const store = createStore(
//   combineReducers({
//     Application,
//     routing: routerReducer
//   }),
//   applyMiddleware(logger, crashReporter)
// );


// const history = syncHistoryWithStore(hashHistory, store);

const store = configureStore({posts: []}, hashHistory);

(function() {
    // window.debug = true;
    window.Promise = window.Promise || Promise; //Promise polyfill
    if(window.debug){
        console.log = function(){};
    }
}());


render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Login}/>
        <Route path="/signup" component={Signup}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app-container')
)
