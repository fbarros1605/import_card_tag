function response(data, status, count) {
    return {
        _count: count,
        _data: data,
        _status: status,
    }
}

module.exports = response;