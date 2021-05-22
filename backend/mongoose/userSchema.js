const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    username:String,
    email:String,
    password:String,
    count:{type:Number, default:0},
    isConfirmed: { type:Boolean, default:false }
    
}, { timestamps:true })

module.exports = model('User', userSchema);

