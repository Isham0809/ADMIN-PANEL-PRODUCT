const { Router } = require("express")
const userController = require("../controllers/userController")
const passport = require("passport");

const userRouter = Router()

userRouter.get('/signup',userController.signupPage)
userRouter.post('/signup', userController.signup)
userRouter.get('/login', userController.loginPage)
userRouter.post('/login', passport.authenticate('user', {failureRedirect: '/user/login'}),userController.login)
userRouter.get('/recover-page',userController.recoverPage)
userRouter.post('/recover',userController.recoverPassword)
userRouter.get('/verify-otp',userController.verifyOtpPage)
userRouter.post('/verify-otp',userController.verifyOtp)
userRouter.get('/changePassword',userController.changePasswordPage)
userRouter.post('/changePassword',userController.forgotPassword)
userRouter.get('/logout', userController.logout)
userRouter.get('/profile', passport.userPassportAuth, userController.profilePage)

userRouter.post('/change-pass/:id', userController.changePassword)
userRouter.post('/edit-user-detail/:id', userController.editUserDetail)

module.exports = userRouter