const ErrorHander = require("../util/errorhandler")
const jwt = require("jsonwebtoken")
const User= require("../modals/userModel")

exports.IsAuthenticated = async (req, res, next) => {
    const {jwtoken} = req.cookies
    
     console.log(jwtoken  ,"token")
    if(!jwtoken){
        return next(new ErrorHander("please login  to access this   resoure", 401))
    }

    const decodeData=jwt.verify(jwtoken, process.env.JWT_SECRET)
    req.user= await User.findById(decodeData.id)
    next()
    console.log(jwtoken, "cookies token")
}

exports.authorizedRole=(...roles)=>{

    return (req, res, next)=>{
        if(!roles.includes(req.user.role)){
            return next( new ErrorHander(`Role ${req.user.role} is not allowed this resource`, 401))
        }
    next()
    }
}