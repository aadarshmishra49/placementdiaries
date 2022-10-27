const express=require('express');

const router=express.Router();
const User=require('../models/user');

//insert an user into database
router.post("/add",(req,res)=>{
    console.log(req.body);
   const user=new User({
        company:req.body.company,
        eligibility:req.body.eligibility,
        salary:req.body.salary,
        informedOn:req.body.informedOn,
        lastday:req.body.lastday
    });

    user.save((err)=>{
      if(err){
        res.json({message:err.message,type:'danger'});
      }  
      else
      {
        req.session.message={
            type:'success',
            message:'Company added successfully',
        };
        res.redirect("/");
      }
    });
});

//get all companies
router.get("/",(req,res)=>{
    User.find().exec((err,users)=>{
        if(err){
            res.json({message:err.message});
        }  else{
            res.render('index',{
                title:'Home Page',users:users,
            })
        }
    })
    
  });
  
router.get("/add",(req,res)=>{
res.render("add_companies",{title:"Add Company"});
});

router.get("/about",(req,res)=>{
  res.render("remind_me",{title:"Remind Me"});
  });
  

router.get("/edit/:id",(req,res)=>{

  let id=req.params.id;
  console.log(id);
  User.findById(id,(err,user)=>{
      if(err){
          res.redirect('/');
      }  else{
        if(user==null){
          res.redirect('/');
        }
        else{ 
          res.render('edit_companies',{
            title:'Edit company',user:user,
        })

        }
          
      }
  })
  });


  router.post('/update/:id',(req,res)=>{
    let id=req.params.id;
    User.findByIdAndUpdate(id,{
        company:req.body.company,
        eligibility:req.body.eligibility,
        salary:req.body.salary,
        informedOn:req.body.informedOn,
        lastday:req.body.lastday
    },(err,result)=>{
      if(err){
        res.json({message:err.message,type:'danger'})
      }
      else{
        req.session.message={
          type:'success',
          message:'Changes updated successfully',
        };
        res.redirect("/");
      }
    })
  });


router.get('/delete/:id',(req,res)=>{
  let id=req.params.id;
  User.findByIdAndRemove(id,(err,result)=>{
    if(err){
      res.json({message:err.message,type:'danger'})
    }
    else{
      req.session.message={
        type:'info',
        message:'Company deleted successfully',
      };
      res.redirect("/");
    }
  })
})
module.exports=router;