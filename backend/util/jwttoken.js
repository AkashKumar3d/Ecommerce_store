
// its not working 

// creating token and saving cookie
const sendtoken = (user, statuscode, res) => {
    const token = user.getJwtToken()

    // option for cookies 
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    
    res.status(statuscode).cookie("token", token, options).json({
        sucess: true,
        user,
        token
    })
}

module.exports = sendtoken