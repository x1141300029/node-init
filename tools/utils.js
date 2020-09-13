// let npm = require('getmac');//获取mac地址
let fs = require("fs");//文件操作
let message = require("./message");//文件操作
/**
 * 验证邮箱格式
 * @param email
 * @returns {*|boolean}
 */
module.exports.emailReg = (email) => {
    let emailReg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;//邮箱格式
    return email && emailReg.test(email);
};

/**
 * 获取当前时间
 * @returns {string}
 */
module.exports.getDate = (format, lastHour) => {
    let date = new Date();
    if (lastHour) {
        date = new Date(new Date().getTime() - lastHour * 60 * 60 * 1000);
    }
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const MM = date.getMilliseconds();
    switch (format) {
        case 'yyyy-MM-dd':
            format = year + '-' + month + "-" + day;
            break;
        case 'yyyyMMddhhmmssMM'://年月日时分秒毫秒
            format = year + "_" + month + "_" + day + "_" + hour + "_" + minute + "_" + second + "_" + MM;
            break;
        default:
            format = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
            break;
    }
    return format;
};
/**
 * 获取用户内网
 * @returns {*}
 */
module.exports.getIPAddress = () => {
    const interfaces = require('os').networkInterfaces();
    for (let devName in interfaces) {
        let iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            let alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
};
/**
 * 获取用户外网ip地址
 * @param callback
 */
module.exports.getV4 = (callback) => {
        let req=require("http").get('http://pv.sohu.com/cityjson?ie=utf-8', function (data) {
            data.on("data", (chunk) => {
                if (chunk && chunk.length !== 0) {
                    try {
                        chunk = chunk.toString().split("=")[1];
                        chunk = JSON.parse(chunk.substring(0, chunk.length - 1));
                        callback(chunk && chunk.cip ? chunk.cip : "0.0.0.0");
                    } catch (e) {
                        callback("0.0.0.0");
                    }
                } else {
                    callback("0.0.0.0");
                }
            });
        });
        req.on("error",function(res){
            callback("0.0.0.0");
        })
};
/**
 * 获取用户mac地址
 * @returns {*}
 */
module.exports.getMac = () => {
    const interfaces = require('os').networkInterfaces();
    for (let devName in interfaces) {
        let iface = interfaces[devName];
        for (let i = 0; i < iface.length; i++) {
            let alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.mac;
            }
        }
    }
};

/**
 * 设置session
 * @param req 请求
 * @param key 键
 * @param value 值
 */
module.exports.setSession = (req, key, value) => {
    req.session[key] = value;
};
/**
 * 获取session
 * @param req 请求
 * @param key 键
 * @returns {*}
 */
module.exports.getSession = (req, key) => {
    return req.session[key];
};
/**
 * 把用户信息保存到session
 * @param req
 * @param value
 */
module.exports.setSessionUserInfo = (req, value) => {
    req.session.userInfo = value;
};
/**
 * 获取session中的用户信息
 * @param req 请求
 * @param res
 * @param next
 * @param key 键
 * @param [valuesArr] 权限等级数组
 * @returns {string|*}
 */
module.exports.getSessionUserInfo = (req, res, next, key, valuesArr) => {
    let userInfo = req.session["userInfo"];
    // userInfo={
    //     "_id": "b39cae31a43d4be8c6860718cc5531e8",
    //     "username": "chenhong",
    //     "phone": "",
    //     "createDate": "2019-12-06T07:26:58.000Z",
    //     "createIp": "106.37.240.38,172.18.218.5,ac:bc:32:ea:4c:43",
    //     "icon": "",
    //     "jurisdictionId": "dbc47597c68f826d8ea308750e41b074",
    //     "jurisdictionName": "超级管理员",
    //     "jurisdictionLevel": "1"
    // };
    if (!userInfo) {
        res.json(message.m1001);
        next();
        return false;
    }
    let value = userInfo[key] || "";
    if (key === "_id") {
        if (!value) {
            res.json(message.m1001);
            next();
            return false
        }
    } else if (key === "jurisdictionLevel") {
        if (!value) {
            res.json(message.m1000);
            next();
            return false;
        }
        let flag = false;//默认没有权限
        for (let i = 0; i < valuesArr.length; i++) {
            if (value === valuesArr[i] + "") {
                flag = true;
                break;
            }
        }

        if (!flag) {
            res.json(message.m1000);
            next();
            return false;
        }
    }
    return value;
};

module.exports.getDatabaseParams = (objects, tableName) => {
    let key = [], value = [], param = "";
    for (let item in objects) {
        key.push(tableName + "." + item);
        value.push(objects[item]);
        param += "?,";
    }
    param = param.substring(0, param.length - 1);
    return {
        key, value, param
    }
};
/**
 * 数组快速去重
 * @param arr 需要去除重复的数组
 * @returns [] 新数组
 */
module.exports.uniq = (arr) => {
    return [...new Set(arr)]
};
/**
 * 导航排序
 * @param result 获取导航
 * @returns {Array}
 */
module.exports.getNavigationOrder = (result) => {
    let p = [], c = [], b = [];//p:父节点 c:子节点 b:按钮
    for (let i = 0; i < result.length; i++) {
        if (result[i].pNav === "0") {
            p.push(result[i]);
        } else if (result[i].isButton === "1") {
            b.push(result[i]);
        } else {
            c.push(result[i]);
        }
    }
    let navArr = [];
    for (let i = 0; i < p.length; i++) {
        let pobj = p[i];
        pobj.child = [];
        for (let j = 0; j < c.length; j++) {
            if (p[i]._id === c[j].pNav) {
                let cobj = c[j];
                cobj.child = [];
                for (let k = 0; k < b.length; k++) {
                    if (c[j]._id === b[k].pNav) {
                        cobj.child.push(b[k]);
                    }
                }
                pobj.child.push(cobj);
            }
        }
        navArr.push(pobj);
    }
    return navArr;
};

/**
 * 分词
 * @param str
 * @returns {string}
 * @constructor
 */
module.exports.parsingWords = (str) => {
    str = str.replace(/\./g, ',');
    str = str.replace(/;/g, ',');
    str = str.replace(/:/g, ',');
    str = str.replace(/"/g, ',');
    str = str.replace(/'/g, ',');
    str = str.replace(/\?/g, ',');
    str = str.replace(/\(/g, ',');
    str = str.replace(/\)/g, ',');
    str = str.replace(/&/g, ',');
    str = str.replace(/^/g, ',');
    str = str.replace(/%/g, ',');
    str = str.replace(/$/g, ',');
    str = str.replace(/#/g, ',');
    str = str.replace(/@/g, ',');
    str = str.replace(/!/g, ',');
    str = str.replace(/~/g, ',');
    str = str.replace(/。/g, ',');
    str = str.replace(/？/g, ',');
    str = str.replace(/‘/g, ',');
    str = str.replace(/”/g, ',');
    str = str.replace(/；/g, ',');
    str = str.replace(/：/g, ',');
    str = str.replace(/）/g, ',');
    str = str.replace(/（/g, ',');
    str = str.replace(/-/g, ',');
    str = str.replace(/——/g, ',');
    str = str.replace(/&/g, ',');
    str = str.replace(/……/g, ',');
    str = str.replace(/%/g, ',');
    str = str.replace(/￥/g, ',');
    str = str.replace(/#/g, ',');
    str = str.replace(/@/g, ',');
    str = str.replace(/！/g, ',');
    str = str.replace(/~/g, ',');
    var sount = '';
    if (/[\u4e00-\u9fa5]/.test(str)) {
        var date = str.split(',');
        for (var d = 0; d < date.length; d++) {
            for (var i = 0; i <= date[d].length; i++) {
                for (var j = i; j <= date[d].length; j++) {
                    if (date[d].slice(i, j).length == 0) {
                        continue;
                    }
                    sount += date[d].slice(i, j) + '/';
                }
            }
        }
    } else {
        var date = str.split(',');
        for (var d = 0; d < date.length; d++) {
            var fz = date[d].split(' ');
            for (var i = 0; i < fz.length; i++) {
                for (var j = i; j < fz.length; j++) {
                    var ls = ''
                    for (var k = i; k <= j; k++) {
                        ls += fz[k] + ' ';
                    }
                    sount += ls.trim() + '/'
                }
            }
        }
    }
    return sount
};

const jwt = require('jsonwebtoken');
let superSecret = "爱神的箭风asdasd口浪尖萨克雷锋2345234奥斯卡爸妈，四大皆空分类静安寺we1223342342342324342asdfsdfsdfsdfsdf";
/**
 * 设置token
 * @param obj
 */
module.exports.setToken = (obj) => {
    let newobj={};
    let arr=Object.keys(obj);
    for(let i=0;i<arr.length;i++){
        if(obj[arr[i]]){
            newobj[arr[i]]=obj[arr[i]];
        }
    }
    return jwt.sign(newobj, superSecret, {});
    // let token = jwt.sign(obj, superSecret, {});
    // jwt.verify(token, superSecret, function (err, decoded) {
    //     if (err) {
    //         callback({code:3000,data:"",message:"验证token失败"});
    //     } else {
    //         callback({code:200,data:"",message:decoded});
    //     }
    // });
};
module.exports.validateToken = (token, callback) => {
    jwt.verify(token,superSecret,(err,decoded)=>{
        if(err){
            callback(message.m1002);
        }else{
            callback({code:200,data:decoded,message:""});
        }
    })
};

