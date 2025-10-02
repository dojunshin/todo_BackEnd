const User = require('../Model/user')
const bcrypt = require('bcrypt')

const userController = {}
const currentTime = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul', hour12: true })

userController.createUser = async (req, res) => {

    try {
        const {name, email, password} = req.body //body에 있는 name, email, password를 가져옴

        const user = await User.findOne({
            email
        })

        //이미 존재하는 유저인지 확인
        if(user) {
            throw new Error('User already exists')
        }

        //PassWord 암호화 시키기
        const saltRounds = 10
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);

        // console.log('hash : ' , hash)

        const newUser = new User({
            name,
            email,
            password: hash
        })
        await newUser.save() //저장

        // //성공시 상태코드 200과 함께 성공 메시지와 새로 생성된 user를 반환
        res.status(200).json({status:'success',data:newUser}) 

        console.log(`create user success : ${currentTime}`)

    } catch(err) {
        //실패시
        res.status(400).json({status:'fail', message:err.message})
    }    
}

//Login
userController.loginWithEmail = async(req,res) => {
    try {
        const {email, password} = req.body

        console.log('email, password : ', email, "^^^", password)

        const user = await User.findOne({email},"-createdAt -updatedAt -__v") //password빼고 다 가져오기

        //password와 user.password는 다름
        //왜냐하면 user.password는 암호화 처리 되어있기 때문
        if(user) {
            //npm에 정보를 보면 비교는 아래와 같이 하면 된다고 제공.
            const isMatch = bcrypt.compareSync(password, user.password); // true
            if(isMatch) {
                //Token발행 
                const token = user.generateToken();
                res.status(200).json({status:'success', user, token});
                console.log(`Login success : ${currentTime}`)
            }
        }

        throw new Error ("Invalid email or password")
        
    }catch (err) {
        //Login 실패
        res.status(400).json({status:'Login fail', message:err.message})
    }
}

module.exports = userController