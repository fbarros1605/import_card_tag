const Router = require('koa-router');
const koaBody = require('koa-body');

const controller = require('./controller');
const Service = require('./service');

function createRouter(service) {
  const router = new Router();
  router
    .post('import', '/v1/importData', koaBody(), controller.importData(service))
  return router;
}

module.exports = (app) => {
  const service = new Service();
  const router = createRouter(service);

  app.use(router.routes());
  app.use(router.allowedMethods());
};