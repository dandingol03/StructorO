module.exports = {
    path: '/StructorO/shardding/index.html/A',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./A'))
        },'A')
    },
    getChildRoutes(location, cb) {
        require.ensure([], (require) => {
            cb(null, [
                require('./routes/AA')
            ])
        },'AA')
    },
}
