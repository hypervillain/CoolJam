import Config, { environment } from 'webpack-config';

import PATHS from './config/paths';

function load(file) {
  return new Config().extend(`[root]/${file}.js`).toObject();
}

environment.setAll({
  root: () => PATHS.webpack,
});

let toExport;

switch (process.env.npm_lifecycle_event) {
case 'start':
  toExport = load('browser_dev');
  break;
case 'browser':
  toExport = load('browser_prod');
  break;
default:
  throw new Error('Invoke through npm only');
}

export default toExport;
