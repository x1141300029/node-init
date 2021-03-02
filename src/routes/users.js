'use script';
const express = require('express');
const router = express.Router();
const tokenConfig = require('../../server/token');
const {success, error} = require('../../server/responseConfig');
import {validate} from 'validator-xingsk'

const {insertUsers, queryUsers} = require('../connection/ConnectionUsers')
/**
 * @api {POST} /users/login 用户登录
 * @apiDescription 用户登录
 * @apiGroup 用户
 * @apiSuccess (200) {type} apiSuccess 成功
 * @apiParam {String} email 邮箱
 * @apiParam {String} password 密码
 * @apiParamExample {Object} Request-Example:
 * {
 *     id:660318
 * }
 *
 * @apiSuccessExample {type} Success-Response:
 * {
 *     code:1,
 *     message:"登录成功",
 *     data:[]
 * }
 *
 * @apiSampleRequest /users/login
 * @apiVersion 1.0.0
 */
router.post('/login', async (req, response) => {
    let body = req.body || {};
    let message = validate([
        {value: body.email || "", required: true, type: 'email', message: '邮箱格式错误'},
        {value: body.password || "", required: true, minlength: 6, maxlength: 20, message: '请输入密码'},
    ]);
    if (message.code < 0) {
        response.status(500).send(error(message));
        return false;
    }
    try {
        let queryUsersRes = await queryUsers({email: body.email, password: body.password});
        if (queryUsersRes && queryUsersRes.data && queryUsersRes.data.length > 0) {
            //查询到数据了
            let userInfo = queryUsersRes.data[0];
            let token = tokenConfig.generateToken({_id: userInfo['_id'], email: userInfo['email']});
            response.status(200).send(success({
                code: 1,
                data: Object.assign({token: token}, {_id: userInfo['_id'], email: userInfo['email']})
            }))
        } else {
            response.status(200).send(success(Object.assign(queryUsersRes, {code: -1, message: '邮箱或密码错误'})))
        }
    } catch (e) {
        response.status(200).send(success(Object.assign(e, {code: -1, message: '登录失败'})))
    }
});
/**
 * 用户注册
 * @url http://127.0.0.1:8090/users/register
 * @param email {String} 邮箱
 * @param password {String} 密码
 * @param code {Number} 邮箱验证码
 */
router.post('/register', async (req, response, next) => {
    let body = req.body || {};
    let message = validate([
        {value: body.email || "", required: true, type: 'email', message: '邮箱格式错误'},
        {value: body.password || "", required: true, minlength: 6, maxlength: 20, message: '请输入密码'},
        {value: body.code, required: true, length: 6, message: '请输入6位数的验证码'},
    ]);
    if (message.code < 0) {
        response.status(500).send(error(message));
        return false;
    }
    try {
        let user = insertUsers({
            email: body.email,
            password: body.password,
            code: body.code,
        });
        response.status(200).send(success(Object.assign(user, {code: 1, message: '注册成功'})))
    } catch (e) {
        response.status(200).send(success(Object.assign(e, {code: -1, message: '注册失败'})))
    }
});
/**
 * 验证token
 * @url http://127.0.0.1:8090/users/validateToken
 * @header authorization {String} token
 */
router.post('/validateToken', async (req, res, next) => {
    let userInfo = await tokenConfig.verify({req, res, next});
    if (userInfo.code < 0) {
        res.status(500).send(error(userInfo));
        return false;
    }
    res.status(200).send(success(Object.assign(userInfo, {code: 1, message: '验证通过'})));
});

module.exports = router;

