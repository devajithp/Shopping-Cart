const { response } = require('express');
var express = require('express');
var router = express.Router();
var productHelpers= require("../Helpers/Product-helpers")
var userHelpers=require("../Helpers/User-helpers")

const verifyLogin=function(req,res,next)
{
  if(req.session.userLogged)
  {
      next()
  }
  else
  {
    res.redirect("/login")
  }
}

router.get('/',verifyLogin, function(req, res, next) {
  let user=req.session.user
  productHelpers.getProduct().then((product)=>
  {
    res.render('user/userHome', {user,product,admin:false});
  })
  
});
router.get("/login",(req,res)=>
{
    res.render("user/user-login")
})
router.get("/signup",(req,res)=>
{
  res.render("user/user-signup")
})
router.post("/signup",(req,res)=>
{
  console.log(req.body)
  userHelpers.doSignUp(req.body).then((data)=>
  {
    console.log(data)
    res.redirect("/login")
  })
})
router.post("/login",(req,res)=>
{
  let user=req.body;
  userHelpers.doLogIn(user).then((response)=>
  {
    if(response.status)
    {
      req.session.user=response.user
      req.session.userLogged=true

      res.redirect("/")
    }
    else{
      res.redirect("/login")
    }
  })
})
router.get("/logout",(req,res)=>
{
  req.session.destroy()
  res.redirect("/")
})


router.get("/home",(req,res)=>
{
  res.redirect("/")
})

module.exports = router;
