const User = require("../modals/userModel");
const sendtoken = require("../util/jwttoken");
const sendEmail = require("../util/sendEmail");
const crypto = require("crypto");
const ErrorHandler = require("../util/errorhandler")
const catchAsyncError = require("../middleware/catchAsyncError.js")
const cloudinary = require("cloudinary");


// register a user 
exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, password, email, avatar } = req.body;
    // cons
    console.log(req.body, "req.body")
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "indexhdfhj",
            url: avatar
        }
    })

    const token = user.getJWTToken()
    res.status(201).json({
        sucess: true,
        user,
        token
    })

})

// login user
exports.loginuser = catchAsyncError(async (req, res, next) => {
    console.log("login here")
    const { email, password } = req.body;

    // checking the user has given email and password 
    if (!email || !password) {
        return next(new ErrorHandler("Please enter email and password", 400));
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid Credentials", 401));
    }

    const isPasswordMatch = user.comparePassword(password);
    if (!isPasswordMatch) {
        return next(new ErrorHandler("Invalid Credentials", 401));
    }
    const token =await  user.getJWTToken();

    // Options for cookies 
    const options = {
        expires: new Date(
            Date.now() + 720432000
        ),
        httpOnly: true,
        
    };

    res.cookie("jwtoken", token, options)

    res.status(201).json({
        success: true,
        user,
        token
    });
    // return res.redirect("/")
    // sendtoken(user, 200, res)
});




// logoout user 
exports.logoutuser = catchAsyncError(async (req, res, next) => {
    try {
        console.log("comming here")
        res.cookie("jwtoken", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
        console.log(req.cookies.jwtoken)

        res.status(200).json({
            sucess: true,
            message: "You are logedout "
        })
    } catch (error) {
        console.log(error)

    }
})

// forgetpassword 
exports.forgetpassword = catchAsyncError(async (req, res, next) => {

    try {
        const user = await User.findOne({ email: req.body.email })

        if (!user) {
            return next(new ErrorHandler("user not found ", 404))
        }

        // Get Reset Password token
        const resettoken = user.getResetPasswordToken()
        await user.save({ validateBeforeSave: false })

        const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resettoken}`

        // send mail for reset password 
        const message = `your password reset token is:- \n\n ${resetPasswordUrl} \n\n if you have not requested this email then please ignore is `;
        try {
            await sendEmail({
                email: user.email,
                subject: `Ecommerce Password Recovery `,
                message,
            })
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            await user.save({ validateBeforeSave: false });
            return next(new ErrorHandler(error.message, 500))
        }
    } catch (error) {
        console.log(error);
    }
})


// resetpassword 
exports.resetpassword = catchAsyncError(async (req, res, next) => {

    // crateing token hash 
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await user.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHander("Reset password Token is Invalid or Has been expired ", 404))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHander("Password does not match", 404))
    }
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    sendtoken(user, 200, res)


})

// get user details 
exports.getuserDetails = catchAsyncError(async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        console.log(user, "single user")
        res.status(200).json({
            sucess: true,
            user
        })
        console.log(user, "all user details");
    } catch (error) {
        console.log(error);
    }

})

// update password  
// error face here 
exports.updatePassword = catchAsyncError(async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('password');
        console.log(user, "nulllll")
        const ispasswordMatch = user.comparePassword(req.body.oldPassword)

        if (!ispasswordMatch) {
            return next(new ErrorHander("Oldpassword is incorrect", 401))
        }

        if (req.body.newPassword !== req.body.confirmPassword) {
            return next(new ErrorHander("Newpassword is incorrect", 400))
        }
        user.password = req.body.newPassword
        console.log(user.password, "user.password")
        await user.save()
        // sendtoken(user, 200, res)

    } catch (error) {
        console.log(error)
    }
})

// update user profile 
exports.updateProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
    }

    console.log(newUserData, "newUserData")
    // we will add cloudinary 
    if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);
    
        const imageId = user.avatar.public_id;
    
        await cloudinary.v2.uploader.destroy(imageId);
    
        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
          folder: "avatars",
          width: 150,
          crop: "scale",
        });
    
        newUserData.avatar = {
          public_id: myCloud.public_id,
          url: myCloud.secure_url,
        };
      }
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        userfindandmodify: false
    })

    console.log(user, "user")

    res.status(200).json({
        sucess: true,
        user
    })
})

// get all user -- for admin 
exports.getAllUsers = catchAsyncError(async (req, res, next) => {
    try {
        const users = await User.find()
        res.status(200).json({
            sucess: true,
            users
        })
    } catch (error) {
        console.log(error)
    }

})


// get singleuser user -- for admin 
exports.getSingleUser = catchAsyncError(async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return next(new ErrorHander("user not found", req.params.id))
        }
        res.status(200).json({
            sucess: true,
            user
        })
    } catch (error) {
        console.log(error)
    }

})

// update user profile 
exports.updateUserRole = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }

    console.log(newUserData, "newUserData")
    // we will add cloudinary 
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        userfindandmodify: false
    })

    console.log(user, "user")

    res.status(200).json({
        sucess: true,
        user
    })
})

// update user profile 
exports.deleteUser = catchAsyncError(async (req, res, next) => {

    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHander(`user does not exist with id ${req.params.id}`))
    }

    await user.remove()
    res.status(200).json({
        sucess: true,
        user
    })
})


