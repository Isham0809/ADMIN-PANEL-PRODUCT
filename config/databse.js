const { default: mongoose } = require("mongoose");

require('dotenv').config()

const url = process.env.MONGODB_URL

let db =async()=>{
    try {
        await mongoose.connect(url)
        console.log("Connected to Databse")
    } catch (error) {
        console.log(error)
    }
}

module.exports = db