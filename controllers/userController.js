const user = require('../models/userSchema')
const nodemailer = require('nodemailer')

module.exports.signupPage = (req, res) => {
    return res.render('./pages/signup')
}

module.exports.signup = async (req, res) => {
    try {
        let data = await user.create(req.body)
        console.log("User Created")
        req.flash('success','User Created')
        return res.redirect('/user/login')
    } catch (error) {
        console.log(error)
        return res.redirect('/user/signup')
    }
}

module.exports.loginPage = (req, res) => {
    return res.render('./pages/login')
}

module.exports.login = (req,res) =>{
    try {
        req.flash('success','Login Successfully')
        return res.redirect('/')
    } catch (error) {
        console.log(error)      
    }
}

module.exports.profilePage = (req, res) => {
    let user = req.user || {}
    return res.render('./pages/profile', {
        user
    })
}

module.exports.logout = (req, res) => {
    req.logout(() => {
        req.flash('success','Logged Out')
        return res.redirect('/user/login')
    })
}

module.exports.changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword, confPassword } = req.body
        let { id } = req.params
        let User = await user.findById(id)

        if (User.password === oldPassword) {
            if (oldPassword !== newPassword) {
                if (newPassword === confPassword) {
                    User.password = newPassword
                    await User.save()
                    req.flash('success','Password is Changed')
                    console.log("Password is Change")
                    return res.redirect('/user/logout')
                }
                else {
                    req.flash('error','New Password and Confirm Password do not match')
                    console.log("New Password and Confirm Password do not match")
                }
            }
            else {
                req.flash('error','Old Password and New Password cannot be same')
                console.log("Old Password and New Password are same")
            }
        }
        else {
            req.flash('error','Old Password is incorrect')
            console.log("Old Password is incorrect")
        }

        return res.redirect(req.get('Referrer') || '/')
    } catch (error) {
        console.log(error)
        return res.redirect(req.get('Referrer') || '/')
    }
}

module.exports.editUserDetail = async (req, res) => {
    try {
        const { username, email, phone } = req.body
        let { id } = req.params
        let data = await user.findByIdAndUpdate(id, req.body)
        await data.save()
        req.flash('success','User Detail is Updated')
        return res.redirect("/user/profile")
    } catch (error) {
        console.log(error)
        return res.redirect("/user/profile")
    }
}

module.exports.recoverPage = (req, res) => {
    return res.render('./pages/email-verification')
}

module.exports.recoverPassword = async (req, res) => {
    try {
        let otp = Math.floor(100000 + Math.random() * 900000)
        let { email } = req.body
        let User = await user.findOne({ email: email })

        if (User) {

            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 587,
                secure: false, // true for port 465, false for other ports
                auth: {
                    user: "isha2001blm@gmail.com",
                    pass: "hylg clrq wxoy lcsh",
                },
            });

            const info = await transporter.sendMail({
                from: '<isha2001blm@gmail.com>', // sender address
                to: `${User.email}`, // list of receivers
                subject: "OTP for Password Recovery", // Subject line
                text: "To recover your password, enter the OTP below", // plain text body
                html: `<b>Your OTP is: ${otp}</b>`, // html body
            });
            if (info.messageId) {
                res.cookie('otp', otp)
                res.cookie('email', JSON.stringify({User : User.email}))
            }
            console.log("Message sent: %s", info.messageId)
            req.flash('success','OTP is sent to your email')
            return res.redirect('/user/verify-otp')
        }
        else {
            req.flash('error', 'Email is not registered')
            console.log("User Not Found")
            return res.redirect(req.get("Referrer") || '/')
        }
    } catch (error) {
        console.log(error)
        return res.redirect(req.get("Referrer") || '/')
    }
}

module.exports.verifyOtpPage = (req, res) => {
    return res.render('./pages/otp')
}

module.exports.verifyOtp = async (req, res) => {
    if (req.body.otp == req.cookies.otp) {
        res.clearCookie('otp')
        req.flash('success','OTP Verified')
        res.redirect('/user/changePassword')
    }

}

module.exports.changePasswordPage = (req, res) => {
    return res.render('./pages/changePassword')
}

module.exports.forgotPassword = async (req, res) => {
    try {
        const emailCookie = req.cookies.email
        const email = JSON.parse(emailCookie).User
        let { newPassword, confPassword } = req.body
        let User = await user.findOne({ email })

        if(newPassword == confPassword){
            User.password = newPassword
            await User.save()
            res.clearCookie('email')
            req.flash('success', 'Password Changed')
            res.redirect('/user/login')
        }else{
            return res.redirect(req.get("Referrer") || '/')
        }
    } catch (error) {
        console.log(error)        
return res.redirect(req.get("Referrer") || '/')
    }
}