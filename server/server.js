const express = require('express')

const app = express()
require('dotenv').config()

const connectDB = require('./config/connectDB')
connectDB()

app.use(express.json());

const cors = require('cors');
app.use(cors('http://localhost:3000'))

app.use('/api/user', require('./routes/userRoute'))
app.use('/api/project', require('./routes/projectRoute'))
app.use('/api/task', require('./routes/taskRoute'))
app.use('/api/historical', require('./routes/historicalRoutes'))

app.listen(process.env.PORT,(err)=> 
err 
? console.log(err)
: console.log(`server is running on localhost:${process.env.PORT}`));