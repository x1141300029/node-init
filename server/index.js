/* 引用入口 */
require('babel-core/register');
require('babel-polyfill');
/* 配置环境 */
require('./runtime');
/* 应用实例 */
const express = require('express');
const app = express();
/* 错误统一处理 */
const createError = require('http-errors');
/* 配置文件 */
const config = require('./config');
/* 日志配置文件 */
const logger = require('./logConfig');
const log4js = require('log4js');
const cookieParser = require('cookie-parser')
// 常量
global.CONSTANTS = require('./common/Constant');
// 日志
global.LOGGER = logger;
app.use(log4js.connectLogger(logger, {level: 'auto', nolog: [/static/g]}))
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({extended: false, limit: '50mb'}))
app.use(cookieParser())
app.use('/static', express.static('public'));
// 路由注册
require('./router')(app);
// 404捕获
app.use(function (req, res, next) {
    next(createError(404))
});
// 异常处理
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    logger.error(Object.assign({status: err.status}, global.CONSTANTS.ERROR, {path: req.url}))
    res.status(err.status || 500).send(Object.assign({status: err.status}, global.CONSTANTS.ERROR, {path: req.url}))
});
let server = app.listen(config.port);
