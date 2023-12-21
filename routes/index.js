import express from 'express';
import users from './users.routes.js';

let routes = express.Router();

//users routes

routes.use('/users',users);



export default routes;
