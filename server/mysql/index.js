let mysql = require('mysql');
let dbConfig = require('./mysql.config');
// let util = require('../../tools/utils');
// let md5 = require("md5-node");

let getDatabaseParams = (objects, tableName) => {
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

module.exports = {
    query({sql, params}) {
        return new Promise((resolve, reject) => {
            //每次使用的时候需要创建链接，数据操作完成之后要关闭连接
            let connection = mysql.createConnection(dbConfig);
            connection.connect((err) => {
                if (err) {
                    reject({code: 500, data: err, message: "操作失败"});
                } else {
                    let arr=[];
                    if(params){
                        for(let item in params){
                            arr.push(params[item])
                        }
                    }
                    //开始数据操作
                    connection.query(sql, arr, (err, results, fields) => {
                        if (err) {
                            reject({code: 500, data: err, message: "操作失败"});
                        } else {
                            resolve({code: 200, data: results, message: "操作成功"});
                        }
                        //results作为数据操作后的结果，fields作为数据库连接的一些字段，大家可以打印到控制台观察一下
                        //停止链接数据库，必须再查询语句后，要不然一调用这个方法，就直接停止链接，数据操作就会失败
                        connection.end((err) => {
                            if (err) {
                                reject({code: 500, data: err, message: "操作失败"});
                            }
                        });
                    });
                }
            });
        })
    },
    /**
     * 添加数据
     * @param tableName 表名
     * @param params 参数 {name:"123"}
     */
    insert(tableName, params) {
        return new Promise((resolve, reject) => {
            params = getDatabaseParams(params, tableName);
            let connection = mysql.createConnection(dbConfig);
            let sql = `INSERT INTO ${tableName}(${params.key}) VALUES(${params.param})`;
            connection.connect(function (err) {
                if (err) {
                    reject({code: 500, data: err, message: "数据库连接失败"})
                } else {
                    //开始数据操作
                    connection.query(sql, params.value, function (err, result, fields) {
                        if (err) {
                            reject({code: 500, data: err, message: "操作失败"})
                        } else {
                            if (result.affectedRows === 0) {
                                reject({code: 500, data: result, message: "操作失败"})
                            } else {
                                resolve({code: 200, data: result, message: "添加成功"})
                            }
                        }
                        connection.end(function (err) {
                            if (err) {
                                reject({code: 500, data: err, message: "数据库关闭失败"})
                            }
                        });
                    });
                }
            });
        })
    },
    //插入多条数据
    insertMany({sql, params}) {
        return new Promise((resolve, reject) => {
            let connection = mysql.createConnection(dbConfig);
            connection.connect(function (err) {
                if (err) {
                    reject({code: 500, data: err, message: "操作失败"});
                } else {
                    //开始数据操作
                    connection.query(sql, params, function (err, result, fields) {
                        if (err) {
                            reject({code: 500, data: err, message: "操作失败"});
                        } else {
                            if (result.affectedRows === 0) {
                                reject({code: 500, data: err, message: "操作失败"});
                            } else {
                                resolve({code: 200, data: result, message: "添加成功"});
                            }
                        }
                        connection.end(function (err) {
                            if (err) {
                                reject({code: 500, data: err, message: "操作失败"});
                            }
                        });
                    });
                }
            });
        })
    },
    /* 修改数据 */
    update({sql, params}) {
        return new Promise((resolve, reject) => {
            let connection = mysql.createConnection(dbConfig);
            connection.connect((err) => {
                if (err) {
                    reject({code: 500, data: err, message: "操作失败"})
                } else {
                    connection.query(sql, params, (err, result, fields) => {
                        if (err) {
                            reject({code: 500, data: err, message: "操作失败"})
                        } else {
                            if (result.affectedRows === 0) {
                                reject({code: 500, data: result, message: "没有查询到此数据"})
                            } else if (result.affectedRows >= 1 && result.changedRows === 0) {
                                resolve({code: 200, data: result, message: "数据未进行修改"})
                            } else if (result.affectedRows >= 1 && result.changedRows >= 1) {
                                resolve({code: 200, data: result, message: "修改成功"})
                            } else {
                                reject({code: 500, data: result, message: "未知错误"})
                            }
                        }
                        connection.end((err) => {
                            if (err) {
                                reject({code: 500, data: err, message: "数据库关闭失败"})
                            }
                        });
                    });
                }
            });
        })
    },
    delete({sql, params}) {
        return new Promise((resolve, reject) => {
            let connection = mysql.createConnection(dbConfig);
            connection.connect((err) => {
                if (err) {
                    reject({code: 500, data: err, message: "操作失败"});
                } else {
                    connection.query(sql, params, (err, result, fields) => {
                        if (err) {
                            reject({code: 500, data: err, message: "操作失败"});
                        } else {
                            if (result.affectedRows === 0) {
                                reject({code: 500, data: err, message: "没有查询到此数据"});
                            } else if (result.affectedRows >= 1) {
                                resolve({code: 200, data: "", message: "删除成功"});
                            } else {
                                reject({code: 500, data: result, message: "操作失败"});
                            }
                        }
                        connection.end((err) => {
                            if (err) {
                                reject({code: 500, data: err, message: "操作失败"});
                            }
                        });
                    });
                }
            });
        })
    }
};
