const router = require('express').Router()
const userCtrl = require('../controllers/Users')
const { protect, admin } = require("../Middlewares/auth");

//validators
const {
    runValidation,
    userRegisterValidation,
    userSigninValidation,
  } = require("../validators/usersValidation");

router.post('/register', userCtrl.register)
router.post('/login', userCtrl.login)
router.get('/logout', userCtrl.logout)
router.post('/refresh_token',protect, userCtrl.getAccessToken)
router.post('/forgot',protect, userCtrl.forgotPassword)
router.post('/reset', protect, userCtrl.resetPassword)
router.get('/user_info/:id',protect, userCtrl.getUserInfor)
router.get('/all_user', protect, admin, userCtrl.getUsersAllInfor)
router.patch('/update_user', protect, userCtrl.updateUser)
router.patch('/update_role/:id', protect, admin, userCtrl.updateUsersRole)
router.delete('/delete_user/:id', protect, admin, userCtrl.deleteUser)
// router.post('/activation', userCtrl.activateEmail)
// Social Login
router.post('/google_login', userCtrl.googleLogin)
router.post('/facebook_login', userCtrl.facebookLogin)

module.exports = router

// router
//   .route("/")
//   .post(userRegisterValidation, runValidation, signupUser)
//   .get(protect, admin, getUsers);
// router.route("/signin").post(userSigninValidation, runValidation, signinUser);
// router
//   .route("/profile")
//   .get(protect, getUserProfile)
//   .put(protect, updateUserProfile);
// router.route("/account-activation").post(activateUser);
