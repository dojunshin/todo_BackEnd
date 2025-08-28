const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    task:{
        type: String,
        required: true // 필수 값
    },
    isComplete:{
        type: Boolean,
        required: true // 필수 값
    }
},{
    timestamps: true // 몇 시 몇 분 몇 초에 생성되었는지, 업데이트 되었는지 확인가능
})

const task = mongoose.model('Task', taskSchema)

module.exports = task