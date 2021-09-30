const Router = require('koa-router');
const koaBody = require('koa-body');

const Controller = require('./controller');
const Service = require('./service');

function createRouter(service) {
  const router = new Router();
  router
  .get('tags', '/v1/tags', Controller.findAll(service))
  .get('tag', '/v1/tag/:id', Controller.findOne(service))
  .post('create', '/v1/tag', koaBody(), Controller.findOrCreate(service))
  .put('update', '/v1/tag', koaBody(), Controller.update(service))
  .delete('delete', '/v1/tag/:id', koaBody(), Controller.delete(service))
  return router;
}

module.exports = (app) => {
  const service = new Service();
  const router = createRouter(service);

  app.use(router.routes());
  app.use(router.allowedMethods());
};