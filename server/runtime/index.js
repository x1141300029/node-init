/**
 * 环境配置
 */
global.RUNTIME=process.env.NODE_ENV||'development';//环境 可选 development test production
const banner = `
--------------------------------
      当前环境为:${global.RUNTIME==='test'?'测试环境':global.RUNTIME==='production'?'正式环境':'开发环境'}
--------------------------------
|       ------   ------        |
|      |              /        |
|      |             /         |
|      |----        /          |
|      |           /           |
|      |          /            |
|      |         ------        |
--------------------------------
`;
console.log(banner);
