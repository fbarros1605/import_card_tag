const Koa = require('koa')
const app = new Koa()
const logger = require('koa-logger');

/* eslint-disable global-require */
const config = require('./config/index');

const port = config.web.port;

app.use(logger());

app.listen(port, () => {
  console.log(`Service running... http://localhost:${port}`);

  require('./src/card/routes')(app);
  require('./src/tag/routes')(app);
  require('./src/import/routes')(app);

})
