const express = require('express')
const app = express()
const ejs = require('ejs')
const dotenv = require('dotenv').config()
const path = require("path")
const flash = require('connect-flash')
const session = require('express-session')
const cors = require('cors')

const DatabaseConnection = require("./app/config/dbCon")
DatabaseConnection()
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(express.json())
app.use(cors())

app.use(session({
  secret: process.env.SESSION_SECRET_KEY,
  saveUninitialized: true,
  resave: true
}))
app.use(flash())

app.use(express.static(__dirname+ "/public"))
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Admin Routes
const adminRouter = require("./app/routes/AdminRoutes")
app.use(adminRouter)

//Placerly Routes 
const placerlyRouter = require("./app/routes/PlacerlyRoutes")
app.use("/api", placerlyRouter)

const port = 5000
app.listen(port, () => {
  console.log("Server is running on http://localhost:5000")
})