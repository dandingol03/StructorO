module.exports = {
    path: '/StructorO/shardding/index.html/B',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./B'))
        })
    }
}
