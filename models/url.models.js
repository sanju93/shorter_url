import mongoose from 'mongoose';

// Url schema which will hold all the shorter api respective to thier original api's

let urlSchema = new mongoose.Schema({
    original_url : {
        type : String
    },
    shorter_url : {
        type : String
    }
},{timestamps : true});


let Url = mongoose.model('Url',urlSchema);

export default Url;