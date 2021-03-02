/* 引用入口 */
require('colors')
require('babel-core/register');
require('babel-polyfill');
require('dotenv').config();

const path = require('path')
/* 应用实例 */
const express = require('express');
const app = express();
/* 错误统一处理 */
const createError = require('http-errors');
/* 日志配置文件 */
const logger = require('./log');
const log4js = require('log4js');
const cookieParser = require('cookie-parser')
// 常量
global.CONSTANTS = require('./common/Constant');
// 日志
global.LOGGER = logger;

app.all("/*",(req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");  // 允许所有路径跨域
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    // res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
})

app.use(log4js.connectLogger(logger, {level: 'auto', nolog: [/static/g]}))
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({extended: false, limit: '50mb'}))
app.use(cookieParser())

// 静态文件访问路径
app.use('/static', express.static(path.join(__dirname, '../public')));

// 路由注册
const router = require('./router');
router(app)

// 404捕获
app.use((req, res, next) => {
    next(createError(404))
});
// 异常处理
app.use((err, req, res, next) => {
    logger.error(Object.assign({status: err.status}, global.CONSTANTS.ERROR, {path: req.url}))
    res.status(err.status || 500).send(Object.assign({status: err.status}, global.CONSTANTS.ERROR, {path: req.url}))
});
let server = app.listen(process.env.port || 8656);

console.log(`服务开启成功：端口号为${process.env.port || 8656}`.blue)
