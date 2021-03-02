let config={};

config.port=process.env.port||8656;//开启端口号
console.log(`应用实例，访问地址 http://127.0.0.1:${config.port}/`);
module.exports=config;
