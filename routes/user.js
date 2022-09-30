const { response } = require('express');
var express = require('express');
var router = express.Router();
var productHelpers= require("../Helpers/Product-helpers")




router.get('/', function(req, res, next) {
  
  productHelpers.getProduct().then((product)=>
  {
    res.render('user/userHome', {product,admin:false});
  })
  
});






router.get("/home",(req,res)=>
{
  res.redirect("/")
})

module.exports = router;
