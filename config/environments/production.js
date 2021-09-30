const path = require('path');

const logPath = path.join(__dirname, '../../logs/prod.log');

module.exports = {
  web: {
    port: process.env.PORT || 3001
  },
  auth: process.env.AUTH,
  url: process.env.URL

};
