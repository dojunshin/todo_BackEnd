
const jwt = require('jsonwebtoken');
require('dotenv').config()

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name:{
        type: String,
        required: true // 필수 값
    },
    email:{
        type: String,
        required: true // 필수 값
    },
    password:{
        type: String,
        required: true // 필수 값
    }
},{
    timestamps: true // 몇 시 몇 분 몇 초에 생성되었는지, 업데이트 되었는지 확인가능
})

//Mongoose 메서드에서 this를 사용해야 할 때는 반드시 function() {}을 써야 합니다.
//화살표 함수 ()=>{}는 this가 바뀌어서 원하는 결과가 나오지 않습니다.

//expiresIn은 토큰의 유효 기간을 설정합니다.    1d는 1day를 의미
userSchema.methods.generateToken = function() {
    const token = jwt.sign({ _id: this._id }, JWT_SECRET_KEY,{expiresIn:'1d'});
    return token;
}

//Mongoose에서 제공하는 toJSON 메서드
userSchema.methods.toJSON = function() {
    // return this
    const user = this._doc; 
    delete user.password;   //항상 password를 제거하고 보냄.
    delete user.__v;        //__v는 mongoose에서 관리하는 버전키
    delete user.createdAt;
    delete user.updatedAt;
    return user;
}

//mongoose에서 model을 생성
//'User'라는 이름 때문에, Mongoose가 자동으로 users라는 컬렉션 이름을 만듬
//그리고 이걸 오라클 처럼 테이블이라고 부르는것이 아니라, 몽고디비에서는 컬렉션이라고 부름
const user = mongoose.model('User', userSchema) 

module.exports = user