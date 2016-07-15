module.exports = {
    path: '/StructorO/shardding/index.html/A/AA',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./AA'))
        })
    }
}
