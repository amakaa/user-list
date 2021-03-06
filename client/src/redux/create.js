import { createStore as _createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware'
import users from './modules/users.js';

export default function createStore() {
  const middleware = [promise, thunk];

  let finalCreateStore;
  finalCreateStore = applyMiddleware(...middleware)(_createStore);

  const store = finalCreateStore(users);

  return store;
}