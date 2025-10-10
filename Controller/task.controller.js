const Task = require('../Model/task')

const taskController = {}
const currentTime = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul', hour12: true })

//createrTask라는 함수를 만듦
//Request는 Header와 Body로 구성
taskController.createTask = async (req, res) => {

    const { userId } = req; //auth.controller.js에서 req.userId로 넘겨준 userId를 가져옴
    //req로 하나, req.userId로 하나 값은 똑같음
    // console.log('Authenticated userId:', req.userId); // 추가

    try {
        const {task, isComplete} = req.body //body에 있는 task와 isComplete를 가져옴
        const newTask = new Task({
            task,
            isComplete,
            author: userId //author 필드에 userId 할당
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

        //이 if 조건의 의미는 filter.task가 null이 아니면, 즉 쿼리스트링에 task가 있으면 그 조건으로 찾고,
        //없으면 그냥 전체 다 찾음
        if (filter.task != null) {   
            taskList = await Task.find(filter).select("-__v").populate("author")
        } else {
            //populate란 다른 컬렉션의 데이터를 조인해서 가져오는 것
            //그리고 select("-__v")는 __v 필드를 제외하고 가져오라는 의미
            /**
             * "author": {
                "_id": "68e364d51fb3512901d4e9d1",
                "name": "test123",
                "email": "test123@test123"
            }, 이런 식으로 author 필드에 user 컬렉션의 데이터가 들어옴
             */
            taskList = await Task.find({}).select("-__v").populate("author")
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