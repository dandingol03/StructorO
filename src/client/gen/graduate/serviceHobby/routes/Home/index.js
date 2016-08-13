var BASIC='/get_render_page.do';
module.exports = {
    path: BASIC,
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('./component/Home.jsx'));
        })
    }
}
