const express = require('express')
const db = require('./config/databse')
const path = require('path')
const bodyParser = require('body-parser')
const LocalStrategy = require('./middlewares/passportLocal')
const passport = require('passport')
const flash = require('connect-flash')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const { flashMessage } = require('./middlewares/flashMessage')

const app = express()

const port = 8081

app.set('view engine','ejs')

app.use(cookieParser())
app.use(express.static(path.join(__dirname + '/assets')))
app.use('/uploads',express.static(path.join(__dirname+'/uploads')))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
    secret: 'user',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(passport.setUserAuth)
app.use(flash())
app.use(flashMessage)

app.use('/',require('./routers'))

app.listen(port,(err)=>{
    if(!err){
        db()
        console.log(`Server is Running on http://localhost:`+port)
    }
})