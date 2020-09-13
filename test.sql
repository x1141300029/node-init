/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50550
Source Host           : localhost:3306
Source Database       : test

Target Server Type    : MYSQL
Target Server Version : 50550
File Encoding         : 65001

Date: 2020-09-13 13:50:12
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `_id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `email` varchar(255) DEFAULT NULL COMMENT '邮箱',
  `password` varchar(255) DEFAULT NULL COMMENT '密码',
  `code` varchar(255) DEFAULT NULL COMMENT '验证码',
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES ('1', '1141300029@qq.com', '123123123', '123');
