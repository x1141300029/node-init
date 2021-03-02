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
console.log('///////////////////////////////////////////////////////////////////')
console.log('//                            _oo0oo_                            //')
console.log('//                           o8888888o                           //')
console.log('//                          88“ . ”88                          //')
console.log('//                           (| `_` |)                           //')
console.log('//                           0\\  =  /0                           //')
console.log('//                        ____/`___`\\____                        //')
console.log('//                      .‘ \\\\|     |//  `.                      //')
console.log('//                     /  \\\\|||  :  |||//  \\                     //')
console.log('//                    /  _||||| -:- |||||-  \\                    //')
console.log('//                    |   | \\\\\\  -  /// |   |                    //')
console.log('//                    | \\_|‘’\\---/‘’|   |                    //')
console.log('//                    \\  .-\\__  `_`  ___/-. /                    //')
console.log('//                  ___`   ‘ /--.--\\   . ； ---                 //')
console.log('//               “”‘< `.___\\_<|>_/___.     >’“”.           //')
console.log('//              | | : `-  \\`.;`\\ _ /`;.`/ - ` :  | |             //');
console.log('//              \\ \\ `-     \\_ __\\ /__ _/   .-`  / /              //')
console.log('//        ========`-.____-.___\\_____/___. ____.-’========       //')
console.log('//                            `=---=‘                           //')
console.log('//         ```````````````````````````````````````````````       //')
console.log('//                   佛祖保佑    永不宕机    永无BUG             //')
console.log('///////////////////////////////////////////////////////////////////')
console.log(" ")
console.log(`当前环境为 : ${process.env.NODE_ENV==='test'?'测试环境':process.env.NODE_ENV==='production'?'正式环境':'开发环境'}`.yellow)
console.log(" ")
module.exports = log4js.getLogger();
