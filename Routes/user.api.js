const express = require('express')
const userController = require('../Controller/user.controller')
const router = express.Router()
const authController = require('../Controller/auth.controller')
//1. 회원가입 Endpoint
router.post ('/', userController.createUser) //POST 요청을 처리하는 createUser 함수 연결
router.post('/login', userController.loginWithEmail)

//token을 통해 유저 ID를 가져오고 , 그 ID로 유저 객체를 찾아서 보내기
router.get('/me', authController.authenticate, userController.getUser)

module.exports = router