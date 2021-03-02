/**
 * 路由总线
 * 读取modules下的路由并向express注册
 * 业务路由模块均放置在modules中
 *
 * @author SHADOW
 * @date 2019-01-12
 */
'use script';
const routes = require('require-dir')('../../src/routes');

module.exports = function(app) {
    return new Promise(resolve => {
        global.LOGGER.info('=> load application router');
        for (const key in routes) {
            const route = routes[key];
            printRouter(key,route.stack);
            app.use(`/${key}`,route);
        }
        global.LOGGER.info('<= application router loaded');
        resolve()
    })
}

/**
 * 打印路由
 * @param key 路由前路径以避免路由名称发生冲突
 * @param stack
 */
function printRouter(key,stack) {
    for (const layer of stack) {
        global.LOGGER.info(`=> Mapped:/${key}${layer.route.path}, methods: ${JSON.stringify(layer.route.methods)} `)
    }
}
