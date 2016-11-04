#!/usr/bin/env node
const path = require('path');
const express = require('express');

const args = process.argv.slice(2);
const useWebpack = args.indexOf('-w') !== -1;

const app = express();
const PORT = 8080;

app.get('/config', (req, res) => {
  res.json({
    name: 'config from express'
  });
});

const start = () => {
  app.listen(PORT, () => {
    console.log(`App started on port ${PORT}!`);
  });
};
if (useWebpack) {
  // Disabling global require so it won't require that dependency in prod
  /* eslint-disable global-require */
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const getWebpackConfig = require('./get-webpack-config.js');
  /* eslint-enable global-require */

  const webpackConfig = getWebpackConfig({ isWebpackDevServer: true });
  const webpackCompiler = webpack(webpackConfig);
  const webpackDevMiddlewareInstance = webpackMiddleware(webpackCompiler,
    {
      publicPath: '',
      noInfo: false,
      quiet: false
    }
  );

  app.use(webpackDevMiddlewareInstance);
  app.use(webpackHotMiddleware(webpackCompiler));
  webpackDevMiddlewareInstance.waitUntilValid(start);
} else {
  app.use(express.static(path.join(__dirname, 'dist')));
  start();
}
