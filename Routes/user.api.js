const express = require('express')
const userController = require('../Controller/user.controller')
const router = express.Router()

//1. 회원가입 Endpoint
router.post ('/', userController.createUser) //POST 요청을 처리하는 createUser 함수 연결
router.post('/login', userController.loginWithEmail)

module.exports = router