const jwt = require('jsonwebtoken');
const secret = "test";
const expiresIn = '30day';
const field = "authorization";
module.exports = {
    generateToken(info) {
        return jwt.sign(info, secret, {expiresIn: expiresIn})
    },
    async verify({req}) {
        if (!(req.headers[field])) {
            return {code: -1, message: '没有传入token'};
        }
        try {
            return await jwt.verify(req.headers[field], secret)
        } catch (e) {
            return {code: -2, message: 'token验证错误'};
        }
    }
};
