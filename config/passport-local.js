import passport from 'passport';
import {Strategy} from 'passport-local';
import User from '../models/users.models.js';

// Configuration of passport-local strategy to identify the users and responsible for initialize the session

passport.use(new Strategy({usernameField : "email"},async function(username,password,done){
    try{
        let user = await User.findOne({email : username});
        if (!user){
            return done(null,false);
        }else{
            if (user.password === password){
                return done(null,user);
            }else{
                return done(null,false);
            }
        }
    }catch(err){
        console.log(err);
        return done(null,false);
    }
    

    
}))

passport.serializeUser((user,done) => {
   return done(null,user.id);
})

passport.deserializeUser(async (id,done) => {
    try{
      let user = await User.findById(id);
      if (user){
        return done(null,user);
      }else{
        return done(null,false);
      }
    }catch(err){
       return done(null,false);
    }
})

export {passport};