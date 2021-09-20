const mongoose=require('mongoose');
var bcrypt = require('bcryptjs');


let userSchema=new mongoose.Schema({
    f_name: { type:String,
        required:true },

    l_name: { type:String,
         required:true },

    u_name: { type:String,
            required:true },

    email: { type:String,
        required:true, 
        unique:true },

    password: { type:String,
        required:true },

        r_password: { type:String,
        required:true },

});




module.exports=mongoose.model('users',userSchema);