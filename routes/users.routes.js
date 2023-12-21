import express from 'express';
import Home from '../controller/home.controller.js';
import UsersController from '../controller/users.controller.js';
import passport from 'passport';

let homeController = new Home();
let usersController = new UsersController();

let users = express.Router();

users.get('/',homeController.home);

//for sign up 
users.post('/createAccount',usersController.SignUp);

//for login
users.get('/login',passport.authenticate('local',{session : true}),usersController.SignIn);


//for logout
users.get('/logout',usersController.Logout);

export default users;