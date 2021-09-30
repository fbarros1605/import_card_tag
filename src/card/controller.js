response = require('../base/base-response');

exports.findAll = (service) => async (ctx) => {
    const list = await service.findAll();
    ctx.body = response(list, 200, list.items_count);
}

exports.findCardsPerTag = (service) => async (ctx) => {
    const tag = ctx.params.tag;
    const list = await service.findCardsPerTag(tag);
    ctx.body = response(list, 200, list.items_count);
}


exports.findOne = (service) => async (ctx) => {
    const card = await service.findOne(ctx.params.id);
    if (card) {
        ctx.body = response(card, 200);
    }
}

exports.findOrCreate = (service) => async (ctx) => {
    const data = ctx.request.body;
    try {
        if (data) {
            let card = await service.findOrCreate(data, data.id);
            if (card) {
                ctx.status = 201;
                ctx.body = card;
            }
        }
    }
    catch (err) {
        if (ctx.status == 404) {
            ctx.status = 404;
            ctx.body = err.errors;
        }
    }
}

exports.update = (service) => async (ctx) => {
    const data = ctx.request.body;
    const id = ctx.request.body.id;
    try {
        if (data && id) {
            if (await service.update(data, id)) {
                ctx.status = 200;
            }
        } else {
            ctx.status = 400;
        }

    } catch (err) {
        if (ctx.status == 404) {
            ctx.status = 404;
            ctx.body = err.errors;
        }
    }   
}

exports.delete = (service) => async (ctx) => {
    const id = ctx.params.id;
    try {
        if (id) {
            if (await service.destroy(id)) {
                ctx.status = 200;
                ctx.body = deleted;
            } else {
                ctx.status = 400;
            }
        } else {
            ctx.status = 400;
        }

    } catch (err) {
        if (ctx.status == 404) {
            ctx.status = 404;
            ctx.body = err.errors;
        }
    }
} 

exports.count = (service) => async (ctx) => {
    const model = await service.count();
    ctx.body = response(model, 200);
}
