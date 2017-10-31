'use strict';

require ('dotenv').config();

const express = require ('express');
const mongoClient = require ('mongodb');
const userRouter = require ('../route/user_router.js');
const error_middleware = require ('./error_middleware.js');

//connect to db
mongoose.Promise = Promise;
mongoose.connect (process.env.MONGODB_URI);


//server
const app = express();


//routes
app.use (useRouter);
app.use (error_middleware);

const serverControl = module.exports = {};


//start
