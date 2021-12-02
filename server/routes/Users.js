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
router.post('/refresh_token', userCtrl.getAccessToken)
router.post('/forgot', userCtrl.forgotPassword)
// router.post('/activation', userCtrl.activateEmail)
// router.post('/reset', auth, userCtrl.resetPassword)
// router.get('/infor', auth, userCtrl.getUserInfor)
// router.get('/all_infor', auth, authAdmin, userCtrl.getUsersAllInfor)
// router.patch('/update', auth, userCtrl.updateUser)
// router.patch('/update_role/:id', auth, authAdmin, userCtrl.updateUsersRole)
// router.delete('/delete/:id', auth, authAdmin, userCtrl.deleteUser)
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
