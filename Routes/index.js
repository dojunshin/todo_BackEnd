const express = require('express')
const router = express.Router()

const taskApi = require('./task.api')
const userApi = require('./user.api')

router.use('/tasks', taskApi) //tasks라는 api가 불리우면, 무조건 taskApi로 연결된다.
router.use('/users', userApi) //users라는 api가 불리우면, 무조건 userApi로 연결된다.

module.exports = router