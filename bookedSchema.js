var mongoose = require ('mongoose');

var BookedSchema = new mongoose.Schema({
    service:String,
    cost:Number,
    name:String,
    phone:Number,
    mail:String,
    message:String

})
mongoose.model('Booked',BookedSchema);
module.exports=mongoose.model('Booked')