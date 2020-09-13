const {insert, query} = require('../../server/mysql')
/**
 * 操作用户
 */
module.exports = {
    /* 添加用户信息 可以在此进行验证数据 */
    insertUsers(params) {
        return insert('users', params);
    },
    /* 查询用户信息 */
    queryUsers(params) {
        return query({sql: 'SELECT users._id,users.email FROM USERS WHERE users.email=? AND users.password=?', params});
    },
}