const Task = require('../Model/task')

const taskController = {}
const currentTime = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul', hour12: true })

//createrTask라는 함수를 만듦
//Request는 Header와 Body로 구성
taskController.createTask = async (req, res) => {

    try {
        const {task, isComplete} = req.body //body에 있는 task와 isComplete를 가져옴
        const newTask = new Task({
            task,
            isComplete
        })
        await newTask.save() //저장

        //성공시 상태코드 200과 함께 성공 메시지와 새로 생성된 task를 반환
        res.status(200).json({status:'success',data:newTask}) 

        console.log(`create success : ${currentTime}`)

    } catch(err) {
        //실패시
        res.status(400).json({status:'fail', message:err.message})
    }    
}

taskController.getTask = async (req,res) => {
    try {

        const { task } = req.query // 쿼리스트링에서 task 추출
        const filter = {}
        if (task) filter.task = task // task 파라미터가 있으면 조건 추가

        console.log('filter : ', filter.task)

        let taskList

        if (filter.task != null) {   
            taskList = await Task.find(filter).select("-__v")
        } else {
            taskList = await Task.find({}).select("-__v")
        }

        res.status(200).json({status:'success', data:taskList}) //성공시 상태코드 200과 함께 성공 메시지와 taskList 반환

        console.log(`get success : ${currentTime}`)

    }catch(err) {
        res.status(400).json({status:'fail', message:err.message})
    }
}

taskController.updateTask = async (req, res) => {
    try {
        const { id } = req.params //URL 파라미터에서 id를 가져옴
        const { task, isComplete } = req.body //body에서 task와 isComplete를 가져옴

        const updatedTask = await Task.findByIdAndUpdate(id, {
            task,
            isComplete
        }, { new: true }) //새로운 값을 반환하도록 설정

        res.status(200).json({status:'success', data:updatedTask}) //성공시 상태코드 200과 함께 업데이트된 task 반환
  
        console.log(`update success : ${currentTime}`)

    }catch(err) {
        res.status(400).json({status:'fail', message:err.message})
    }
}

taskController.deleteTask = async (req, res) => {

    try {
        const { id } = req.params
        console.log('삭제 요청 id:', id); // 추가
        await Task.findByIdAndDelete(id)
        res.status(200).json({status:'success', message:'Task deleted successfully'})
        console.log(`delete success : ${currentTime}`)

    }catch(err) {
        res.status(400).json({status:'fail', message:err.message})
    }
}

module.exports = taskController