const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dath33603:<password>@cluster0.xcezadi.mongodb.net/?retryWrites=true&w=majority')
       .catch( (err)=>{
               console.log("Loi ket noi CSDL: ");
               console.log(err);
       });
module.exports = { mongoose }