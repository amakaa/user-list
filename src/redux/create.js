import { createStore as _createStore, applyMiddleware } from 'redux';
import createMiddleware from './middleware/clientMiddleware.js';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import asyncMiddleware from 'redux-async';
import { combineReducers } from 'redux';
import reducers from './modules/reducer.js';

export default function createStore(history, client, data) {
  const reduxRouterMiddleware = routerMiddleware(history);

  const middleware = [createMiddleware(client), reduxRouterMiddleware, thunk];

  let finalCreateStore;
  finalCreateStore = applyMiddleware(...middleware, asyncMiddleware)(_createStore);

  const store = finalCreateStore(combineReducers(reducers), data);

  return store;
}