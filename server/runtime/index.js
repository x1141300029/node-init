/**
 * 环境配置
 */
global.RUNTIME=process.env.NODE_ENV||'development';//环境 可选 development test production

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
const colors=require('colors/safe');
console.log(" ")
console.log(colors.yellow(`当前环境为 : ${global.RUNTIME==='test'?'测试环境':global.RUNTIME==='production'?'正式环境':'开发环境'}`))
console.log(" ")

































