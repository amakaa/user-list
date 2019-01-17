import React, {Fragment} from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import { throttle } from 'lodash';
import { loadState, saveState } from './utils/localStorage';
import createStore from './redux/create.js';
import ApiClient from './helpers/ApiClient';

import getRoutes from './routes';

import './index.css';

const history = createHistory();
const client = new ApiClient();
const persistedState = loadState();
const store = createStore(history, client, persistedState);

store.subscribe(throttle(() => {
  saveState(store.getState());
}), 1000);

const Main = () => (
  <Fragment>
    <BrowserRouter>
      {getRoutes(store)}
    </BrowserRouter>
  </Fragment>
)
ReactDOM.render(<Provider store={store}>
    <Main />
  </Provider>, document.getElementById('root'));
