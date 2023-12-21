import mongoose from "mongoose";


// Configuration of Database connectivity
async function DatabaseConnect(){
    try{
        await mongoose.connect('mongodb+srv://sanjay139474:sanjay139474@cluster0.ezvu5hl.mongodb.net/Users?retryWrites=true&w=majority')
        console.log("Database connected");
    }catch(err){
        console.log(err);
    }
  
}

export default DatabaseConnect;