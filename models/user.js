const mongoose=require('mongoose');
const userSchema= new mongoose.Schema({
company:{
    type:String,
    required:true,
},
eligibility:{
    type:String,
    required:true,
},
salary:{
    type:String,
    required:true,
},

informedOn:{
    type:String,
    required:true,

},
lastday:{
    type:String,
    required:true,
  
}
});
module.exports=mongoose.model('User',userSchema);