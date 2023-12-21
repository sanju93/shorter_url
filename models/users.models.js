import mongoose from 'mongoose';

//Simple Users Schema to identify the users
let usersSchema = new mongoose.Schema({
    email : {
        type : String,
        unique : true
    },
    password : {
        type : String
    }
  
},{
    timestamps : true
})

let User = mongoose.model('User',usersSchema);


export default User;