const path = require('path');

const logPath = path.join(__dirname, '../../logs/dev.log');

module.exports = {
  web: {
    port: process.env.PORT || 3004
  },
  url: 'http://localhost:3004',
  auth: process.env.AUTH || '7c916890-1bd6-11ec-8fa6-8fc39d0a17b4' //uuid 

};
