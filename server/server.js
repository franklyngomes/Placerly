const express = require('express')
const app = express()
const ejs = require('ejs')
const dotenv = require('dotenv').config()
const path = require("path")

const DatabaseConnection = require("./app/config/dbCon")
DatabaseConnection()
app.set('view engine', 'ejs')
app.set('views', 'views')
app.use(express.json())

app.use(express.static(__dirname+ "/public"))

//Admin Routes
const adminRouter = require("./app/routes/AdminRoutes")
app.use("/", adminRouter)

const port = 5000
app.listen(port, () => {
  console.log("Server is running on http://localhost:5000")
})