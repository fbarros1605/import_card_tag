response = require('../base/base-response');

exports.importData = (service) => async (ctx) => {
    try { 
        const body = ctx.request.body;        
        if (!await service.importData(body)) {
            throw new Error('Something had wrong (issue)!');
        };
        ctx.status = 200;
        ctx.body = {_status: 200, message: 'Done'};
    } catch (err) {
        ctx.status = 500;
        ctx.body = err;
    }
}