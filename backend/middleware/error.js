// error handling file 
const ErrorHandler = require('../util/errorhandler');

module.exports=(err, req ,res,  next) => {
    err.statusCode=err.statusCode || 500;
    err.message=err.message || "internal Server Error";

    // wrong mongo db error 
    if(err.name=="CastError"){
        const message = `resource not found. Invalid : ${err.path}`;
        err=new ErrorHandler(message, 400);
    }

    // dublicate register error
    if(err.code==11000){
    const message =`dublicate ${Object.key(err.keyValue)} Entered`
    err=new ErrorHandler(message, 400);
    }

    // wrong jwt error
    if(err.name=="JsonWebTokenError"){
        const message = `json Web token is invalid , try again `;
        err=new ErrorHandler(message, 400);
    }

     // Expire jwt error
     if(err.name=="TokenExpiredError"){
        const message = `json Web token is  expired, try`;
        err=new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        sucess:false,
        message:err.message,
    })
} 