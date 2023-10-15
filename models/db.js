const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://dath33603:QWCNouzimMLmQESf@cluster0.xcezadi.mongodb.net/?retryWrites=true&w=majority')
       .catch( (err)=>{
               console.log("Loi ket noi CSDL: ");
               console.log(err);
       });
module.exports = { mongoose }