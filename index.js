const express = require('express');
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config')
const Products = require('./Routes/Products')
const Auth = require('./Routes/Auth')


const app = express();
app.use(express.json())
app.use(cors())
dotenv.config('./.env')
connectDB()
app.use('/v1/products', Products)
app.use('/v1/auth', Auth)



app.listen(process.env.PORT,() =>{
    console.log("server started")
})