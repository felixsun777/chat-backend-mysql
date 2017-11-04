/*
 Navicat Premium Data Transfer

 Source Server         : 127.0.0.1
 Source Server Type    : MySQL
 Source Server Version : 50636
 Source Host           : 127.0.0.1:3306
 Source Schema         : chat

 Target Server Type    : MySQL
 Target Server Version : 50636
 File Encoding         : 65001

 Date: 03/11/2017 23:41:11
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for friends
-- ----------------------------
DROP TABLE IF EXISTS `friends`;
CREATE TABLE `friends` (
  `user_initiate` varchar(20) NOT NULL,
  `user_finish` varchar(20) NOT NULL,
  PRIMARY KEY (`user_initiate`,`user_finish`),
  KEY `user_finish` (`user_finish`),
  CONSTRAINT `user_finish` FOREIGN KEY (`user_finish`) REFERENCES `users` (`username`),
  CONSTRAINT `user_initiate` FOREIGN KEY (`user_initiate`) REFERENCES `users` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for message
-- ----------------------------
DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
  `mno` int(11) NOT NULL AUTO_INCREMENT,
  `user_initiate` varchar(20) DEFAULT NULL,
  `user_finish` varchar(20) DEFAULT NULL,
  `message` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`mno`),
  KEY `user_initiate1` (`user_initiate`),
  KEY `user_finish1` (`user_finish`),
  CONSTRAINT `user_finish1` FOREIGN KEY (`user_finish`) REFERENCES `users` (`username`),
  CONSTRAINT `user_initiate1` FOREIGN KEY (`user_initiate`) REFERENCES `users` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `username` varchar(20) NOT NULL,
  `password` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

SET FOREIGN_KEY_CHECKS = 1;
