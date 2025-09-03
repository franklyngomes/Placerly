const express = require("express");
const app = express();
const ejs = require("ejs");
const dotenv = require("dotenv").config();
const path = require("path");
const flash = require("connect-flash");
const session = require("express-session");
const cors = require("cors");
const MongoStore = require("connect-mongo");
const cookieParser = require('cookie-parser')

const DatabaseConnection = require("./app/config/dbCon");
DatabaseConnection();
app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

const allowedOrigins = [
  "https://placerly-1.onrender.com",
  "https://placerly.vercel.app",
  "https://placerly.onrender.com",
  "http://localhost:3000"
];
app.set("trust proxy", 1);
app.use(
  cors({
    origin:function (origin , callback){
      if(!origin) return callback(null, true);
      if(allowedOrigins.includes(origin)){
        callback(null, true)
      }else{
        callback(new Error("Not allowed by CORS"))
      }
    },
    credentials: true
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_CONNECTION_STRING,
      collectionName: "sessions",
    }),
    cookie: {
      maxAge: 1000 * 60 * 60, // 1 hour
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    },
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.messages = req.flash("message") || [];
  res.locals.success = req.flash("success") || [];
  res.locals.error = req.flash("error") || [];
  next();
});

app.use(express.static(__dirname + "/public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Admin Routes
const adminRouter = require("./app/routes/AdminRoutes");
app.use(adminRouter);

//Placerly Routes
const placerlyRouter = require("./app/routes/PlacerlyRoutes");
app.use("/api", placerlyRouter);

const AdminAuthRoutes = require("./app/routes/AdminAuthRoutes");
app.use("/admin", AdminAuthRoutes)

const port = process.env.PORT;
app.listen(port, () => {
  console.log("Server is running on http://localhost:5000");
});
