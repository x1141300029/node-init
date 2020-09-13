### 项目简介

> 极速搭建nodejs项目

### npm包

```
babel-core 
babel-polyfill
babel-preset-env
config 读取配置文件-本项目中暂未使用
cookie-parser 存储cookie-本项目中暂未使用
cross-env 运行项目使用，用于指定环境（本地/测试/正式）可在package.json中查看配置
express
formidable 表单解析，用于文件上传
http-errors 请求错误信息
log4js log日志
md5-node md5加密-本项目中暂未使用-可用于密码加密
mysql 链接数据库使用
require-dir 读取文件夹-本项目中读取router信息，并进行统一添加到 app中
validator-xingsk 验证请求参数，具体使用方式见npmjs.com官网搜索validator-xingsk
```

### node初始化项目

```
运行sql文件 sql文件在项目根目录
安装依赖 npm i
运行本地项目 npm run dev
运行测试项目 npm run dev:test
运行正式项目 npm run build
```

### 项目中判断运行环境

```
if(global.RUNTIME==="development"){
	console.log('本地环境');
}else if(global.RUNTIME="test"){
	console.log('测试环境');
}else if(global.RUNTIME="production"){
	console.log('production');
}
```

### 开放接口

#### 用户注册 post

> http://127.0.0.1:8090/users/register

参数

| 参数名   | 类型   | 取值方式 | 描述       |
| -------- | ------ | -------- | ---------- |
| email    | string | body     | 邮箱       |
| password | string | body     | 密码       |
| code     | number | body     | 邮箱验证码 |

返回信息

| 参数名  | 类型                          | 描述       |
| ------- | ----------------------------- | ---------- |
| code    | number                        | 返回状态值 |
| data    | Object\|Array\|Number\|String | 返回数据   |
| message | string                        | 返回消息   |

#### 用户登录 post

> http://127.0.0.1:8090/users/login

参数

| 参数名   | 类型   | 取值方式 | 描述 |
| -------- | ------ | -------- | ---- |
| email    | string | body     | 邮箱 |
| password | string | body     | 密码 |

返回信息

| 参数名  | 类型                          | 描述       |
| ------- | ----------------------------- | ---------- |
| code    | number                        | 返回状态值 |
| data    | Object\|Array\|Number\|String | 返回数据   |
| message | string                        | 返回消息   |

#### 验证token post

> http://127.0.0.1:8090/users/validateToken

参数

| 参数名        | 类型   | 取值方式 | 描述  |
| ------------- | ------ | -------- | ----- |
| authorization | string | headers  | token |

返回信息

| 参数名  | 类型                          | 描述       |
| ------- | ----------------------------- | ---------- |
| code    | number                        | 返回状态值 |
| data    | Object\|Array\|Number\|String | 返回数据   |
| message | string                        | 返回消息   |

#### 文件上传 post

> http://127.0.0.1:8090/upload/fileUpload

参数

| 参数名 | 类型 | 描述 |
| ------ | ---- | ---- |
| file   | File | 文件 |

返回信息

| 参数名  | 类型                          | 描述       |
| ------- | ----------------------------- | ---------- |
| code    | number                        | 返回状态值 |
| data    | Object\|Array\|Number\|String | 返回数据   |
| message | string                        | 返回消息   |