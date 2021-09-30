const Router = require('koa-router');
const koaBody = require('koa-body');

const Controller = require('./controller');
const Service = require('./service');

function createRouter(service) {
  const router = new Router();
  router
  .get('cards', '/v1/cards', Controller.findAll(service))
  .get('cardsPerTag', '/v1/cards/tag/:tag', Controller.findCardsPerTag(service))
  .get('card', '/v1/card/:id', Controller.findOne(service))
  .post('create', '/v1/card', koaBody(), Controller.findOrCreate(service))
  .put('update', '/v1/card', koaBody(), Controller.update(service))
  .delete('delete', '/v1/card/:id', koaBody(), Controller.delete(service))
  return router;
}

module.exports = (app) => {
  const service = new Service();
  const router = createRouter(service);

  app.use(router.routes());
  app.use(router.allowedMethods());
};