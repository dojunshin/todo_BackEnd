const express = require('express')
const taskController = require('../Controller/task.controller')
const router = express.Router()

router.post ('/', taskController.createTask) //POST 요청을 처리하는 createTask 함수 연결

router.get('/', taskController.getTask) //GET 요청을 처리하는 getTask 함수 연결

router.put('/:id', taskController.updateTask) //PUT 요청을 처리하는 updateTask 함수 연결

router.delete('/:id', taskController.deleteTask) //DELETE 요청을 처리하는 deleteTask 함수 연결

module.exports = router