const path=require('path');
const fs = require('fs');
const express = require('express');
const router = express.Router();
const {success} = require('../../server/responseConfig');
const formidable=require('formidable');
/**
 * 文件上传 支持多文件
 */
router.post('/fileUpload', async (req, res, next) => {
    let form = new formidable.IncomingForm();
    form.encodeing = "utf-8";
    form.uploadDir =path.join(__dirname + "/../../public/upload");
    form.keepExtensions = true;//保留后缀
    form.maxFieldsSize = 3*1024 * 1024;//最大传输文件大小
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.json({code: 500, data: "", message: "文件上传失败"});
            return false;
        }
        let resultPath=[];
        for(let item in files){
            let file=files[item];
            let sourceStr="0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G";
            let arrStr=sourceStr.split(",");
            let result=""; //定义变量并初始化
            let index=0;
            for(let i=0;i<5;i++){
                index=parseInt(Math.random()*arrStr.length);
                result+=arrStr[index];
            }
            fs.renameSync(file.path, form.uploadDir + "/"+(new Date().valueOf())+result+'.'+file.path.split('.')[1]);//文件重命名
            resultPath.push(`/static/upload/${(new Date().valueOf())+result+'.'+file.path.split('.')[1]}`)
        }
        res.status(200).send(success(Object.assign( {code: 1, message: '上传成功',data:resultPath})));
    });
});

module.exports = router;