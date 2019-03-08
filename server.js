import '@babel/polyfill';
import React from 'react';
import cors from 'cors';
import { renderToString } from 'react-dom/server';
import jsonServer from 'json-server';
import { StaticRouter, matchPath } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import JssProvider from 'react-jss/lib/JssProvider';
import { SheetsRegistry } from 'react-jss/lib/jss';
import {
  MuiThemeProvider,
  createMuiTheme,
  createGenerateClassName,
} from '@material-ui/core/styles';

import createStore from './client/src/redux/create.js';
import App from './client/src/containers/App/App';

const app = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const port = 3000;
const generateClassName = createGenerateClassName();
const sheetsRegistry = new SheetsRegistry();
const sheetsManager = new Map();
const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function renderFullPage(html, css) {
  return `
    <!doctype html>
    <html>
      <head>
        <title>User registration</title>
        <style id="jss-server-side">${css}</style>
      </head>
      <body>
        <div id="root">${html}</div>
      </body>
    </html>
  `;
}

app.use(cors());

app.use('/api/', router);

app.get('/*', function (req, res) {
  const helmetContext = {};
  const store = createStore();
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <Provider store={store} key="provider">
        <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
          <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
            <StaticRouter location={req.url} context={helmetContext}>
              <App />
            </StaticRouter>
          </MuiThemeProvider>
        </JssProvider>
      </Provider>
    </HelmetProvider>
  );
  const css = sheetsRegistry.toString();

  if (helmetContext.url) {
    console.log('good')
    // Somewhere a `<Redirect>` was rendered
    redirect(301, helmetContext.url)
  } else {
    // we're good, send the response
    res.status(200);

    return res.send(renderFullPage(html, css));
  }
});
app.use(middlewares);
app.listen(port, () => console.log(`App listening on port ${port}!`))

export default app;
