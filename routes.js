
const express = require('express');
const userRoutes = require('./routes/userRoutes')
const couponRoutes = require('./routes/couponRoutes')
const app = express.Router();

app.use('/user',userRoutes)
app.use('/coupon',couponRoutes)


module.exports=app;