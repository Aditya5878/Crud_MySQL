
require("dotenv").config()
const express = require('express')
const app = express()
const cookieParser = require("cookie-parser");
const cors = require('cors'); 
const router = require('./Routes/router')

// Enable CORS for all routes
app.use(cors({
  origin: "http://localhost:3000", 
  credentials: true, 
}));

app.use(express.json())
app.use(cookieParser())

app.use(router)

const port = 3001

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
