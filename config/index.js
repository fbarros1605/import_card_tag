const { version } = require('../package.json');
const path = require('path');

const ENV = process.env.NODE_ENV || 'development';

// /* eslint import/no-dynamic-require: "off" */
const envConfig = require(path.join(__dirname, 'environments', ENV));

const config = Object.assign({
  web: {
    port: process.env.PORT
  },
  url: process.env.URL,
  auth: process.env.AUTH
}, envConfig);

module.exports = config;
