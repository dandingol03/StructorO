module.exports = {
    path: '/StructorO/shardding/index.html/C',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./C'))
        })
    }
}
