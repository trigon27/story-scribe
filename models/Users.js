const mongoose= require('mongoose');
const {Schema,model}=mongoose;

const userSchema = new Schema({
    userName: { type: String, required: true, min: 4,unique:true },
    password: { type: String, required: true }
});

userModel=model('Users',userSchema);
module.exports=userModel;