const express =require('express');
 const cookieParser = require('cookie-parser');
//  const route = Router();
const { registerUser, loginuser, logoutuser, forgetpassword, resetpassword, getuserDetails, updatePassword, updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser } = require('../controllers/UserController');
const router = express.Router()
const {IsAuthenticated, authorizedRole} = require("../middleware/isAuth")

router.use(cookieParser());
router.route("/register").post(registerUser)
router.route("/login").post(loginuser)
router.route("/password/forgot").post(forgetpassword)
router.route("/password/reset/:token").put(resetpassword)

router.route("/logout").get(logoutuser)
router.route("/me").get(IsAuthenticated, getuserDetails)
router.route("/password/update").put(IsAuthenticated, updatePassword)
router.route("/me/update").put(IsAuthenticated, updateProfile)
router.route("/admin/users").get(IsAuthenticated, authorizedRole("Admin"),  getAllUsers)
router.route("/admin/user/:id").get(IsAuthenticated, authorizedRole("Admin"),  getSingleUser).put(IsAuthenticated, authorizedRole("Admin"),updateUserRole ).delete(IsAuthenticated, authorizedRole("Admin"), deleteUser)






// module.exports = router;
module.exports = router;

