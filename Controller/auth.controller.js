//권한관리

const authController = {};
const jwt = require("jsonwebtoken");

require('dotenv').config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

authController.authenticate = (req,res,next) => {
    //api.defaults.headers["authorization"] = "Bearer " + response.data.token;
    try {
        const tokenString = req.headers.authorization

        if (!tokenString) {
            throw new Error("invalid token");
        } 

        const token = tokenString.replace("Bearer ", "");

        //jwt.verify가 비동기 함수..
        jwt.verify(token,JWT_SECRET_KEY,(error,payload)=>{
            if (error) {
                throw new Error("invalid token");
            }
            //userId를 다음 함수로 보내주기 위해 작업
            // console.log('payload : ', payload._id);
            req.userId = payload._id;
        })

        //next에서 다음 컨트롤러로 넘어가면서, req.userId를 이용해 userId를 가져올 수 있음
        next(); //이 next가 user.api.js에 다음 함수로 선언되어진, userController.getUser로 감
    
    } catch (error) {
        res.status(400).json({status:'fail', message:error.message});
    }    
}

module.exports = authController;

//MiddleWare를 사용해야함.
