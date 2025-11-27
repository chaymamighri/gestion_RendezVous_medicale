const mongoose = require("mongoose");


const rdvSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  contact: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status:{ type:String, enum:['pending' , 'confirmed'], 
    default:'pending'} 
});


module.exports = mongoose.model("Booking", rdvSchema);