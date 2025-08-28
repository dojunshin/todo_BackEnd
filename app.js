const express =require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()
const MongoDB_URI_PROD = process.env.MongoDB_URI_PROD

// console.log('MongoDB_URI_PROD : ', MongoDB_URI_PROD)

//1.App만들기
const app = express()
app.use(bodyParser.json())
app.use(cors())

//2.router가져오기
const indexRouter = require('./Routes/index')
app.use('/api',indexRouter)

// const mongoURI = 'mongodb://localhost:27017/todoList' //뒤의 todoList는 데이터베이스의 이름
//npm install dotenv로 설치해야함
const mongoURI = MongoDB_URI_PROD


//현재시간(한국시간) 가져오기
const currentTime = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul', hour12: true })

mongoose.connect(mongoURI, {useNewUrlParser:true})
.then(() => {
    console.log(`MongoDB todoList connected : ${currentTime}`)
})
.catch((err) => {
    console.error('MongoDB connection error:', err)
})

const PORT = process.env.PORT || 5001

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})