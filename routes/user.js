const { response } = require('express');
var express = require('express');
var router = express.Router();
var productHelpers= require("../Helpers/Product-helpers")
var userHelpers=require("../Helpers/User-helpers")



router.get('/', function(req, res, next) {
 
    res.render('user/userHome', {admin:false});
  
  
});






router.get("/home",(req,res)=>
{
  res.redirect("/")
})


module.exports = router;
