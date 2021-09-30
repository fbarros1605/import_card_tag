response = require('../base/base-response');

exports.findAll = (service) => async (ctx) => {
    const list = await service.findAll();
    ctx.body = response(list, 200, list.items_count);
}

exports.findOne = (service) => async (ctx) => {
    const tag = await service.findOne(ctx.params.id);
    if (tag) {
        ctx.body = response(tag, 200);
    }
}

exports.findOrCreate = (service) => async (ctx) => {
    const data = ctx.request.body;
    try {
        if (data) {
            console.log(data)
            let tag = await service.findOrCreate(data);
            if (tag) {
                ctx.status = 201;
                ctx.body = tag;
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
