/**
 * 日志模块-通过log4js实现
 * log4j配置文档 {@link https://log4js-node.github.io/log4js-node/}
 * 封装logger对象提供服务
 *
 * @author SHADOW
 * @date 2019-05-20
 */
'use strict'
const log4js = require('log4js');
const config = require('./config');
log4js.configure(config);
module.exports = log4js.getLogger();
