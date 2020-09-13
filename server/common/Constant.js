/**
 * 常量
 * @author SHADOW
 * @date 2020-03-06
 * @type Object
 */
module.exports = {
  SUCCESS: {
    code: 200,
    success: true
  },
  ERROR: {
    error: true
  },
  VERSION: {
    V1: 'V1'
  },
  HOMEDIR: process.env.HOME || process.env.USERPROFILE,

  UPLOAD_DIST: `${process.env.HOME || process.env.USERPROFILE}/${global.RUNTIME.uploadDist || '/muyang-upload'}`
};
