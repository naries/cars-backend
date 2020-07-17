const express = require('express')
const logger = require ('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const cors = require('cors')

mongoose.connect('mongodb://localhost:27017/car-database')
mongoose.Promise = global.Promise

const app = express()

//middlewares
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(helmet())
app.use(cors({
    origin: ['http://localhost:3001'],
    method: ["GET", "POST", "DELETE","PUT", "PATCH"]
}))

//routes
const users = require('./routes/users')
const cars = require('./routes/cars')

app.use('/users', users)
app.use('/cars', cars)
//Catching errors
app.use((req, res, next)=>{
    const err= new Error('Not Found')
    err.status= 404
    next(err)
})

//Error Handling
app.use((err, req, res)=>{
    const error = app.get('env') === 'development' ? err : {}
    const status = err.status || 500

    //respond to client
    res.status(status).json({
        error: {
            message: error.message
        }
    })
})

//Start the server
const port = app.get('port') || 3000
app.listen(port, ()=> console.log(`Server is listening to port ${port}`))